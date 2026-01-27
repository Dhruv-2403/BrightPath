import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    completedLectures: [
        { type: String }
    ],
}, { minimize: false });

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

export default CourseProgress;
