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


const app=express()

app.use(cors())

app.get("/",(req,res)=>{
    res.send("API is working")
})

app.post("/clerk",clerkWebHooks)

const PORT = process.env.PORT || 3000

const startServer = async () => {
    await connectDB()
    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)       
    })
}

startServer()