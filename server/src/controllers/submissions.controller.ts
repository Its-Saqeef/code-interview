import express from "express";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/connection.ts";
import { Problems } from "../db/schema.ts";
import { createSubmissionRecord } from "../services/submissionService.ts";
import { getSubmissionStatsForProblem } from "../services/problemStats.ts";
import { AppError, catchAsync } from "../utils/errors.ts";

const submitSchema = z.object({
    language: z.string().min(1),
    code: z.string().min(1),
    passedTestCases: z.number().int().min(0),
    totalTestCases: z.number().int().min(1),
    runtimeMs: z.number().int().min(0).optional(),
    memoryKb: z.number().int().min(0).optional(),
});

export const createSubmission = catchAsync(async (req: express.Request, res: express.Response) => {
    const { slug } = req.params;

    if (typeof slug !== "string") {
        throw new AppError("Invalid problem slug", 400);
    }

    const user = req.body.user as { id: string } | undefined;
    if (!user?.id) {
        throw new AppError("Unauthorized", 401);
    }

    const problem = await db.query.Problems.findFirst({
        where: and(eq(Problems.slug, slug), eq(Problems.status, "published")),
        columns: { id: true },
    });

    if (!problem) {
        throw new AppError("Problem not found", 404);
    }

    const {
        language,
        code,
        passedTestCases,
        totalTestCases,
        runtimeMs,
        memoryKb,
    } = submitSchema.parse(req.body);

    if (passedTestCases > totalTestCases) {
        throw new AppError("passedTestCases cannot exceed totalTestCases", 400);
    }

    const submission = await createSubmissionRecord({
        userId: user.id,
        problemId: problem.id,
        language,
        code,
        passedTestCases,
        totalTestCases,
        runtimeMs,
        memoryKb,
    });

    const stats = await getSubmissionStatsForProblem(problem.id);

    return res.status(201).json({
        success: true,
        message: "Submission recorded successfully",
        submission,
        stats,
    });
});
