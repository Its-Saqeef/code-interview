import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.ts";
import bcrypt from "bcrypt";
import { count, eq } from "drizzle-orm";
import { seedProblems } from "./seedProblems.ts";

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

async function seedDemoSubmissions() {
    try {
        const admin = await db.query.User.findFirst({
            where: eq(schema.User.email, "admin@compile.io"),
        });

        if (!admin) return;

        const publishedProblems = await db.query.Problems.findMany({
            where: eq(schema.Problems.status, "published"),
            columns: { id: true, slug: true },
        });

        for (const problem of publishedProblems) {
            const [existing] = await db
                .select({ total: count() })
                .from(schema.Submissions)
                .where(eq(schema.Submissions.problemId, problem.id));

            if (Number(existing?.total ?? 0) > 0) {
                continue;
            }

            const demoSubmissions = Array.from({ length: 20 }, (_, index) => ({
                userId: admin.id,
                problemId: problem.id,
                language: ["Python 3", "Java", "C++", "JavaScript"][index % 4],
                code: "// demo submission",
                status: index < 12 ? "passed" as const : "failed" as const,
                passedTestCases: index < 12 ? 5 : index % 5,
                totalTestCases: 5,
                runtimeMs: 20 + index,
            }));

            await db.insert(schema.Submissions).values(demoSubmissions);
            console.log(`Seeded demo submissions for problem: ${problem.slug}`);
        }
    } catch (error) {
        console.error("Failed to seed demo submissions:", error);
    }
}

async function seedTestCasesFromExamples() {
    try {
        const publishedProblems = await db.query.Problems.findMany({
            where: eq(schema.Problems.status, "published"),
            columns: { id: true, slug: true, examples: true },
            with: {
                testCases: {
                    columns: { id: true },
                },
            },
        });

        for (const problem of publishedProblems) {
            if (problem.testCases.length > 0 || !problem.examples?.length) {
                continue;
            }

            await db.insert(schema.TestCases).values(
                problem.examples.map((example, index) => ({
                    problemId: problem.id,
                    input: example.input,
                    expectedOutput: example.output,
                    isPublic: true,
                    order: index,
                })),
            );

            console.log(`Seeded test cases from examples for problem: ${problem.slug}`);
        }
    } catch (error) {
        console.error("Failed to seed test cases from examples:", error);
    }
}

export default async function connectDB() {
    try {
        const client = await pool.connect();
        console.log('Database connected');
        client.release();
        await seedUsers();
        await seedProblems();
        await seedTestCasesFromExamples();
        await seedDemoSubmissions();
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}