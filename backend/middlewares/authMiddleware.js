
import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
    try {
        // Check if auth object exists
        if (!req.auth) {
            return res.json({ success: false, message: "Authentication required" });
        }

        const userId = req.auth.userId;

        // Check if userId exists
        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }

        // Get user from Clerk
        const response = await clerkClient.users.getUser(userId);

        // Check if user has educator role
        if (response.publicMetadata.role !== "educator") {
            return res.json({ success: false, message: "Unauthorized Access - Educator role required" });
        }

        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.json({ success: false, message: error.message });
    }
}