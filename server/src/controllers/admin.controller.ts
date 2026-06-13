import express from "express";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/connection.ts";
import { Problems, Tags, ProblemTags, TestCases } from "../db/schema.ts";
import type { Difficulty } from "../db/schema.ts";
import { AppError, catchAsync } from "../utils/errors.ts";

const difficultyMap: Record<"easy" | "medium" | "hard", Difficulty> = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
};

const problemSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    difficulty: z.enum(["easy", "medium", "hard"]),
    timeLimit: z.number().min(1),
    memoryLimit: z.number().min(1),
    tags: z.array(z.string()).min(1),
    constraints: z.array(z.string()).min(1),
    hints: z.array(z.string()).min(1),
    examples: z.array(z.object({
        input: z.string().min(1),
        output: z.string().min(1),
        explanation: z.string().optional(),
    })).min(1),
    starterCode: z.record(z.string(), z.string()),
    badges: z.array(z.string()).default([]),
    status: z.enum(["draft", "published"]),
    imageUrl: z.string().optional(),
    recommendedMinutes: z.number().optional(),
    testCases: z.array(z.object({
        input: z.string().min(1),
        expectedOutput: z.string().min(1),
        isPublic: z.boolean().default(true),
    })).min(1),
});

function toSlug(value: string) {
    return value.toLowerCase().replace(/\s+/g, "-");
}

export const addProblem = catchAsync(async (req: express.Request, res: express.Response) => {
    const {
        title,
        description,
        difficulty,
        timeLimit,
        memoryLimit,
        tags,
        constraints,
        hints,
        examples,
        starterCode,
        badges,
        status,
        imageUrl,
        recommendedMinutes,
        testCases,
    } = problemSchema.parse(req.body);

    const slug = toSlug(title);

    const existingProblem = await db.query.Problems.findFirst({
        where: eq(Problems.slug, slug),
    });

    if (existingProblem) {
        throw new AppError("A problem with this title already exists", 409);
    }

    const lastProblemNumber = await db.query.Problems.findFirst({
        orderBy: [desc(Problems.problemNumber)],
    });
    const newProblemNumber = lastProblemNumber ? lastProblemNumber.problemNumber + 1 : 1;

    const problem = await db.transaction(async (tx) => {
        const [createdProblem] = await tx.insert(Problems).values({
            title,
            description,
            difficulty: difficultyMap[difficulty],
            timeLimitMs: timeLimit,
            memoryLimitMb: memoryLimit,
            constraints,
            hints,
            examples,
            starterCode,
            badges,
            status,
            imageUrl,
            recommendedMinutes,
            problemNumber: newProblemNumber,
            slug,
        }).returning();

        for (const tagName of tags) {
            const tagSlug = toSlug(tagName);
            let tag = await tx.query.Tags.findFirst({
                where: eq(Tags.slug, tagSlug),
            });

            if (!tag) {
                [tag] = await tx.insert(Tags).values({
                    name: tagName,
                    slug: tagSlug,
                }).returning();
            }

            await tx.insert(ProblemTags).values({
                problemId: createdProblem.id,
                tagId: tag.id,
            });
        }

        await tx.insert(TestCases).values(
            testCases.map((testCase, index) => ({
                problemId: createdProblem.id,
                input: testCase.input,
                expectedOutput: testCase.expectedOutput,
                isPublic: testCase.isPublic,
                order: index,
            })),
        );

        return createdProblem;
    });

    return res.status(201).json({
        success: true,
        message: "Problem created successfully",
        problem,
    });
});
