import express from "express"


import { updateRoleToEducator } from "../controllers/educatorController.js"
import { protectEducator } from "../middlewares/authMiddleware.js"
import upload from "../configs/multer.js"
import { addCourse } from "../controllers/educatorController.js"

const educatorRouter = express.Router()


educatorRouter.get("/update-role", updateRoleToEducator)
educatorRouter.post("/add-course", upload.single("image"), protectEducator, addCourse)

export default educatorRouter