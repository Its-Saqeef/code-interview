import { z } from "zod";
import { db } from "../db/connection.ts";
import { User } from "../db/schema.ts";
import express from "express";
import { generateToken } from "../services/jwt_service.ts";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";

const loginSchema = z.object({
    username: z.string().min(3, "Username or email must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function login(req: express.Request, res: express.Response) {
    try {
        const { username, password } = loginSchema.parse(req.body);

        if (!username) {
            return res.status(400).json({ success: false, message: 'Username is required' });
        }

        const users = await db.select().from(User).where(
            or(
                eq(User.email, username),
                eq(User.username, username)
            )
        );

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid username" });
        }

        const user = users[0];

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        await generateToken({ name: user.name, email: user.email, id: user.id }, res);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: { name: user.name, email: user.email, id: user.id },
        });
    } catch (error) {
        console.error("Login error caught:", error);
        if (error instanceof z.ZodError) {
            const message = error.issues?.[0]?.message || error.message || "Validation failed";
            return res.status(400).json({ success: false, message });
        }
        return res.status(500).json({ success: false, message: "Failed to login user" });
    }
}

export async function logout(req: express.Request, res: express.Response) {
    try {
        let token = req.cookies?.token;
        if (!token && req.headers.cookie) {
            const cookies = req.headers.cookie.split(';').reduce((acc: Record<string, string>, cookie) => {
                const [key, value] = cookie.trim().split('=');
                if (key && value) {
                    acc[key] = decodeURIComponent(value);
                }
                return acc;
            }, {});
            token = cookies.token;
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "No token found" });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Error logging out user:", error);
        return res.status(500).json({ success: false, message: "Failed to logout user" });
    }
}
