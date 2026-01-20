import express from "express"
import cors from "cors"

import "dotenv/config"

import connectDB from './configs/mongodb.js'


const app=express()

await connectDB()

app.use(cors())



app.get("/",(req,res)=>{
    res.send("API is working")
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)       
})