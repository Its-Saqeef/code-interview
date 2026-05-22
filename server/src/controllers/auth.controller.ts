import { z } from "zod";
import { db } from "../db/connection.ts";
import { User } from "../db/schema.ts";
import express from "express";
import { generateToken } from "../services/jwt_service.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { AppError, catchAsync } from "../utils/errors.ts";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const login = catchAsync(async (req: express.Request, res: express.Response) => {
    const { email, password } = loginSchema.parse(req.body);

    const users = await db.select().from(User).where(
        eq(User.email, email)
    );

    if (users.length === 0) {
        throw new AppError("Invalid email", 401);
    }

    const user = users[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new AppError("Invalid password", 401);
    }

    await generateToken({ name: user.name, email: user.email, id: user.id, role: user.role, avatarUrl: user.avatarUrl }, res);

    return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: { name: user.name, email: user.email, id: user.id, role: user.role, avatarUrl: user.avatarUrl },
    });
});

export const logout = catchAsync(async (req: express.Request, res: express.Response) => {
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
        throw new AppError("No token found", 401);
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

export const getMe = catchAsync(async (req: express.Request, res: express.Response) => {
    const user = req.body.user;
    if (!user) {
        throw new AppError("Unauthorized", 401);
    }
    return res.status(200).json({
        success: true,
        user,
    });
});
