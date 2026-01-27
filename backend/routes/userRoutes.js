import express from "express"


import { getUserData } from "../controllers/userController.js"
import { purchaseCourse } from "../controllers/userController.js"

import { userEnrolledCourses, createPaymentIntent, addUserCourseProgress, getUserCourseProgress, enrollCourse } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/data", getUserData)
userRouter.get("/enrolled-courses", userEnrolledCourses)
userRouter.post("/purchase", purchaseCourse)
userRouter.post("/create-payment-intent", createPaymentIntent)
userRouter.post("/add-progress", addUserCourseProgress)
userRouter.get("/get-progress/:courseId", getUserCourseProgress)
userRouter.post("/enroll/:courseId", enrollCourse)
export default userRouter;

