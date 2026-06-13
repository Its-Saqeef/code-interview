import { z } from "zod"
import { db } from "../db/connection.ts";
import { User } from "../db/schema.ts";
import express from "express";
import { generateToken } from "../services/jwtService.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { CloudinaryUpload } from "../services/cloudinary.ts";
import { toPublicUser } from "../services/userProfile.ts";
import { AppError, catchAsync } from "../utils/errors.ts";

const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(100),
    username: z.string().min(3, "Username must be at least 3 characters").max(100),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
    avatarUrl: z.string().optional(),
})

export const registerUser = catchAsync(async (req: express.Request, res: express.Response) => {
    const { name, username, email, password, avatarUrl } = userSchema.parse(req.body);
    
    if (!name || !username || !email || !password) {
        throw new AppError('All fields are required', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userAlreadyExists = await db.query.User.findFirst({ where: eq(User.email, email) });
    if (userAlreadyExists) {
        throw new AppError('User already exists', 400);
    }

    let avatar = { url: "" };
    if(avatarUrl) {
    avatar = await CloudinaryUpload(avatarUrl);
    }
    const [user] = await db.insert(User).values({
        name,
        username,
        email,
        password: hashedPassword,
        avatarUrl: avatar.url
    }).returning();

    await generateToken({ name: user.name, email: user.email, id: user.id, role: user.role, avatarUrl: user.avatarUrl, username: user.username }, res);
    
    return res.status(201).json({ 
        success: true, 
        message: 'User registered successfully', 
        user: toPublicUser(user),
    });
});

export const getUser = catchAsync(async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        throw new AppError('Invalid or missing user ID', 400);
    }
    const [user] = await db.select().from(User).where(eq(User.id, id));
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return res.status(200).json({ success: true, user: toPublicUser(user) });
});
