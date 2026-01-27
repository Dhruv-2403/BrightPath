import User from "../models/user.js"
import Stripe from "stripe";
import Purchase from "../models/purchase.js"
import Course from "../models/course.js"
import CourseProgress from "../models/courseProgress.js"
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User Not Found" })
        }
        res.json({ success: true, userData: user })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}


export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate("enrolledCourses")

        const enrolledCourses = await Promise.all(
            userData.enrolledCourses.map(async (course) => {
                const progress = await CourseProgress.findOne({ userId, courseId: course._id });
                return {
                    ...course._doc,
                    progress: progress ? progress.completedLectures : []
                };
            })
        );

        res.json({ success: true, enrolledCourses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId
        const userData = await User.findById(userId)

        const courseData = await Course.findById(courseId)
        if (!courseData || !userData) {
            return res.json({ success: false, message: "Course not found" })
        }

        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)

        }

        const newPurchase = await Purchase.create(purchaseData)
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)


        const currency = process.env.CURRENCY.toLowerCase()

        const line_item = [{

            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1

        }
        ]

        const session = await stripeInstance.checkout.sessions.create({

            line_items: line_item,
            mode: "payment",
            success_url: `${origin}/loading/my_enrollments`,
            cancel_url: `${origin}/`,
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })

        res.json({ success: true, session_url: session.url })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}

export const createPaymentIntent = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.auth.userId;
        const userData = await User.findById(userId);
        const courseData = await Course.findById(courseId);

        if (!courseData || !userData) {
            return res.json({ success: false, message: "Course or User not found" });
        }

        const amount = Math.round((courseData.coursePrice - courseData.discount * courseData.coursePrice / 100) * 100);
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency = process.env.CURRENCY.toLowerCase();

        // Create a pending purchase
        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (amount / 100).toFixed(2),
            status: "Pending"
        };
        const purchase = await Purchase.create(purchaseData);

        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount,
            currency,
            metadata: {
                purchaseId: purchase._id.toString()
            }
        });

        res.json({ success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Add user course progress
export const addUserCourseProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.body;
        const userId = req.auth.userId;

        let progressData = await CourseProgress.findOne({ userId, courseId });

        if (progressData) {
            if (progressData.completedLectures.includes(lectureId)) {
                return res.json({ success: true, message: "Lecture already completed" });
            }
            progressData.completedLectures.push(lectureId);
            await progressData.save();
        } else {
            progressData = await CourseProgress.create({
                userId,
                courseId,
                completedLectures: [lectureId]
            });
        }

        res.json({ success: true, message: "Progress Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get user course progress
export const getUserCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.auth.userId;

        const progressData = await CourseProgress.findOne({ userId, courseId });

        res.json({ success: true, progressData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}