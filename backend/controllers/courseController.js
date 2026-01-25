import Course from "../models/course.js";

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            isPublished: true
        }).select(
            ["-courseContent", "enrolledStudents"]
        ).populate({ path: "educator" })


        res.json({ success: true, courses })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}

export const getCourseId = async (req, res) => {
    try {
        const { id } = req.params

        const courseData = await Course.findById(id).populate({ path: "educator" })

        courseData.courseContent.forEach(ch => {
            ch.chapterContent.forEach(l => {
                if (!l.isPreviewFree) {
                    l.lectureUrl = ""
                }
            })
        })



        res.json({ success: true, courseData })



    } catch (err) {

        res.json({ success: false, message: err.message })

    }
}




