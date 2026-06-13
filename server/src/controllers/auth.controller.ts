import { z } from "zod";
import { db } from "../db/connection.ts";
import { User } from "../db/schema.ts";
import express from "express";
import { generateToken } from "../services/jwtService.ts";
import { and, eq, ne } from "drizzle-orm";
import bcrypt from "bcrypt";
import { AppError, catchAsync } from "../utils/errors.ts";
import { toPublicUser } from "../services/userProfile.ts";
import {
    getLanguageBreakdownForUser,
    getRecentSubmissionsForUser,
    getUserProfileStats,
} from "../services/userStats.ts";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const updateProfileSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100).optional(),
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(30)
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .optional(),
    bio: z.string().max(500).optional(),
    country: z.string().max(100).optional(),
    githubUrl: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
});

function getAuthUserId(req: express.Request): string {
    const user = req.body.user as { id?: string } | undefined;
    if (!user?.id) {
        throw new AppError("Unauthorized", 401);
    }
    return user.id;
}

export const login = catchAsync(async (req: express.Request, res: express.Response) => {
    const { email, password } = loginSchema.parse(req.body);

    const users = await db.select().from(User).where(
        eq(User.email, email),
    );

    if (users.length === 0) {
        throw new AppError("Invalid email", 401);
    }

    const user = users[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new AppError("Invalid password", 401);
    }

    const publicUser = toPublicUser(user);
    await generateToken(publicUser, res);

    return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: publicUser,
    });
});

export const logout = catchAsync(async (req: express.Request, res: express.Response) => {
    let token = req.cookies?.token;

    if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(";").reduce((acc: Record<string, string>, cookie) => {
            const [key, value] = cookie.trim().split("=");
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
    const userId = getAuthUserId(req);

    const user = await db.query.User.findFirst({
        where: eq(User.id, userId),
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return res.status(200).json({
        success: true,
        user: toPublicUser(user),
    });
});

export const updateMe = catchAsync(async (req: express.Request, res: express.Response) => {
    const userId = getAuthUserId(req);
    const updates = updateProfileSchema.parse(req.body);

    if (updates.username) {
        const existing = await db.query.User.findFirst({
            where: and(eq(User.username, updates.username), ne(User.id, userId)),
        });

        if (existing) {
            throw new AppError("Username is already taken", 409);
        }
    }

    const [updatedUser] = await db.update(User)
        .set({
            ...(updates.name !== undefined ? { name: updates.name } : {}),
            ...(updates.username !== undefined ? { username: updates.username } : {}),
            ...(updates.bio !== undefined ? { bio: updates.bio } : {}),
            ...(updates.country !== undefined ? { country: updates.country } : {}),
            ...(updates.githubUrl !== undefined ? { githubUrl: updates.githubUrl || null } : {}),
            updatedAt: new Date(),
        })
        .where(eq(User.id, userId))
        .returning();

    if (!updatedUser) {
        throw new AppError("User not found", 404);
    }

    const publicUser = toPublicUser(updatedUser);
    await generateToken(publicUser, res);

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: publicUser,
    });
});

export const getMyStats = catchAsync(async (req: express.Request, res: express.Response) => {
    const userId = getAuthUserId(req);
    const stats = await getUserProfileStats(userId);

    return res.status(200).json({
        success: true,
        stats,
    });
});

export const getMySubmissions = catchAsync(async (req: express.Request, res: express.Response) => {
    const userId = getAuthUserId(req);
    const submissions = await getRecentSubmissionsForUser(userId, 10);

    return res.status(200).json({
        success: true,
        submissions,
    });
});

export const getMyLanguages = catchAsync(async (req: express.Request, res: express.Response) => {
    const userId = getAuthUserId(req);
    const languages = await getLanguageBreakdownForUser(userId);

    return res.status(200).json({
        success: true,
        languages,
    });
});
