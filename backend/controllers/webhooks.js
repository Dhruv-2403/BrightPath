import WebHook from "svix"
import Stripe from "stripe"
import User from "../models/user.js"
import Purchase from "../models/purchase.js"
import Course from "../models/course.js"

export const clerkWebHooks = async (req, res) => {
    try {
        const hook = new WebHook(process.env.CLERK_WEBHOOK_SECRET)
        await hook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        })

        const { data, type } = req.body

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.create(userData)
                res.json({ success: true })
                break
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({ success: true })
                break
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id)
                res.json({ success: true })
                break;
            }
            default:
                break;
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const stripeWebHooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_KEY);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const { purchaseId } = paymentIntent.metadata;

            if (purchaseId) {
                const purchaseData = await Purchase.findById(purchaseId);
                if (purchaseData) {
                    const userData = await User.findById(purchaseData.userId);
                    const courseData = await Course.findById(purchaseData.courseId);

                    // Avoid duplicate enrollment
                    if (!userData.enrolledCourses.includes(courseData._id)) {
                        userData.enrolledCourses.push(courseData._id);
                        await userData.save();

                        courseData.enrolledStudents.push(userData._id);
                        await courseData.save();
                    }

                    purchaseData.status = "Completed";
                    await purchaseData.save();
                }
            }
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const { purchaseId } = paymentIntent.metadata;

            if (purchaseId) {
                const purchaseData = await Purchase.findById(purchaseId);
                if (purchaseData) {
                    purchaseData.status = "Failed";
                    await purchaseData.save();
                }
            }
            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}
