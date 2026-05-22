import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.ts";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
}

export const pool = new Pool({
    connectionString: databaseUrl,
});

export const db = drizzle(pool, { schema });

export async function seedUsers() {
    try {
        const adminEmail = "admin@compile.io";
        const adminExists = await db.query.User.findFirst({
            where: eq(schema.User.email, adminEmail),
        });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("admin123456", salt);
            await db.insert(schema.User).values({
                name: "Administrator",
                username: "admin",
                email: adminEmail,
                role: "admin",
                password: hashedPassword,
            });
            console.log("Seeded admin user: admin@compile.io / admin123456");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Failed to seed admin user:", error);
    }
}

export default async function connectDB() {
    try {
        const client = await pool.connect();
        console.log('Database connected');
        client.release();
        await seedUsers();
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}