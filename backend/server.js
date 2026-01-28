import express from "express"
import cors from "cors"


import dotenv from "dotenv";
import path from "path";


import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

// Check if required environment variables are set
if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in environment variables');
    console.log('💡 Please set MONGODB_URI in Render dashboard or .env file');
    process.exit(1);
}

console.log('✅ Environment variables loaded');
import connectDB from './configs/mongodb.js'
import { clerkWebHooks, stripeWebHooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express"
import connectCloudinary from "./configs/cloudinary.js"
import educatorRouter from "./routes/educatorRoutes.js"
import courseRouter from "./routes/courseRoutes.js"
import userRouter from "./routes/userRoutes.js"
const app = express()

// CORS Configuration - Allow all origins for development
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://brightpath-ztb8.onrender.com'
        ];
        
        // Allow any Vercel deployment
        if (origin.includes('vercel.app')) {
            return callback(null, true);
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'origin']
}))

app.use(clerkMiddleware())
app.use(express.json())

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "BrightPath API is running",
        timestamp: new Date().toISOString()
    })
})


// Webhook endpoints (must be before express.json())
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebHooks)
app.post("/clerk", express.json(), clerkWebHooks)

// API Routes
app.use("/api/educator", educatorRouter)
app.use("/api/course", courseRouter)
app.use("/api/user", userRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ 
        success: false, 
        message: err.message || 'Internal server error' 
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    })
})


const PORT = process.env.PORT || 3000

// Connect to services
await connectCloudinary()

const startServer = async () => {
    try {
        await connectDB()
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Server is running on port ${PORT}`)
            console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`)
            console.log(`✅ MongoDB connected`)
            console.log(`✅ Cloudinary connected`)
        })
    } catch (error) {
        console.error('❌ Failed to start server:', error)
        process.exit(1)
    }
}

startServer()

