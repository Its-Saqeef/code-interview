import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.ts";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
}

export const pool = new Pool({
    connectionString: databaseUrl,
});

export const db = drizzle(pool, { schema });

export default async function connectDB() {
    try {
        const client = await pool.connect();
        console.log('Database connected');
        client.release();
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}