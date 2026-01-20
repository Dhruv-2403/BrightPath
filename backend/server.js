import express from "express"
import cors from "cors"


import dotenv from "dotenv";
import path from "path";


import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
import connectDB from './configs/mongodb.js'
import { clerkWebHooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express"
import connectCloudinary from "./configs/cloudinary.js"
import educatorRouter from "./routes/educatorRoutes.js"
const app = express()

app.use(cors())
app.use(clerkMiddleware())
app.get("/", (req, res) => {
    res.send("API is working")
})
// clerk webhooks

app.post("/clerk", clerkWebHooks)

app.use("/api/educator", educatorRouter)

const PORT = process.env.PORT || 3000
await connectCloudinary()
const startServer = async () => {
    await connectDB()



    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}


startServer()

