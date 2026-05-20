import express from "express";
import { verifyToken } from "../services/jwt_service.ts";

export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const decodedToken = await verifyToken(req, res);
        if (!decodedToken) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        req.body.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ success: false, message: 'Failed to authenticate user' });
    }
}