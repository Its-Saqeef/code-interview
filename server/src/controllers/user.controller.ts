import { z } from "zod"
import { db } from "../db/connection.ts";
import { User } from "../db/schema.ts";
import express from "express";
import { generateToken } from "../services/jwt_service.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const userSchema = z.object({
    name: z.string().min(3).max(100),
    username: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
})

export async function registerUser(req: express.Request, res: express.Response) {
    try {
        const { name, username, email, password } = userSchema.parse(req.body);
        [name, username, email, password].forEach((item) => {
            if (item === "") {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }
        });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userAlreadyExists = await db.query.User.findFirst({ where: eq(User.email, email) });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const [user] = await db.insert(User).values({
            name,
            username,
            email,
            password: hashedPassword,
        }).returning();
        await generateToken({ name, email, id: user.id }, res);
        return res.status(201).json({ success: true, message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: 'Failed to register user' });
    }
}

export async function getUser(req: express.Request, res: express.Response) {
    try {
        const { id } = req.params;
        if (typeof id !== "string") {
            return res.status(400).json({ success: false, message: 'Invalid or missing user ID' });
        }
        const [user] = await db.select().from(User).where(eq(User.id, id));
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error getting user:', error);
        return res.status(500).json({ success: false, message: 'Failed to get user' });
    }
}
