import jwt from "jsonwebtoken";
import express from "express";

export async function generateToken(payload: any, res: express.Response) {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
        });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
}

export async function verifyToken(req: express.Request) {
    try {
        // Retrieve token from parsed cookies or fallback to manual header parsing
        let token = req.cookies?.token;
        
        if (!token && req.headers.cookie) {
            const rawCookies = req.headers.cookie;
            const cookies = rawCookies.split(";").reduce((acc: Record<string, string>, cookie) => {
                const [key, val] = cookie.trim().split("=");
                if (key && val) {
                    acc[key] = decodeURIComponent(val);
                }
                return acc;
            }, {});
            token = cookies.token;
        }

        if (!token) {
            return null;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}