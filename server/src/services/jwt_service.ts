import jwt from "jsonwebtoken";
import express from "express";

export async function generateToken(payload: any, res: express.Response) {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
}

export async function verifyToken(req: express.Request, res: express.Response) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch (error) {
        console.error("Error verifying token:", error);
        throw error;
    }
}