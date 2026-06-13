import express from "express";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/connection.ts";
import { Problems, TestCases } from "../db/schema.ts";
import {
    runJavaScriptAgainstTests,
    runUnsupportedLanguage,
} from "../services/codeRunner.ts";
import { getSubmissionStatsForProblem } from "../services/problemStats.ts";
import { createSubmissionRecord } from "../services/submissionService.ts";
import { resolveTestCasesForRun } from "../services/testCaseResolver.ts";
import { AppError, catchAsync } from "../utils/errors.ts";

const runSchema = z.object({
    language: z.enum(["JavaScript", "Python", "Java", "C++"]),
    code: z.string().min(1),
    mode: z.enum(["run", "submit"]).default("run"),
});

export const runProblemCode = catchAsync(async (req: express.Request, res: express.Response) => {
    const { slug } = req.params;

    if (typeof slug !== "string") {
        throw new AppError("Invalid problem slug", 400);
    }

    const { language, code, mode } = runSchema.parse(req.body);

    const problem = await db.query.Problems.findFirst({
        where: and(eq(Problems.slug, slug), eq(Problems.status, "published")),
        columns: { id: true, examples: true },
    });

    if (!problem) {
        throw new AppError("Problem not found", 404);
    }

    const dbTestCases = await db.query.TestCases.findMany({
        where: eq(TestCases.problemId, problem.id),
        orderBy: [asc(TestCases.order)],
        columns: {
            id: true,
            input: true,
            expectedOutput: true,
            isPublic: true,
        },
    });

    const resolvedTestCases = resolveTestCasesForRun(dbTestCases, problem.examples, mode);

    if (resolvedTestCases.length === 0) {
        throw new AppError("No test cases configured for this problem", 400);
    }

    const testCaseInputs = resolvedTestCases.map((testCase) => ({
        id: testCase.id,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
    }));

    const runResult = language === "JavaScript"
        ? runJavaScriptAgainstTests(code, testCaseInputs)
        : runUnsupportedLanguage(language, testCaseInputs);

    if (mode === "submit") {
        const user = req.body.user as { id: string } | undefined;
        if (!user?.id) {
            throw new AppError("Unauthorized", 401);
        }

        await createSubmissionRecord({
            userId: user.id,
            problemId: problem.id,
            language,
            code,
            passedTestCases: runResult.passed,
            totalTestCases: runResult.total,
            runtimeMs: runResult.results.reduce((max, result) => Math.max(max, result.runtimeMs ?? 0), 0),
        });

        const stats = await getSubmissionStatsForProblem(problem.id);

        return res.status(200).json({
            success: true,
            message: runResult.passed === runResult.total
                ? "All test cases passed"
                : `${runResult.passed}/${runResult.total} test cases passed`,
            run: runResult,
            stats,
        });
    }

    return res.status(200).json({
        success: true,
        message: `${runResult.passed}/${runResult.total} test cases passed`,
        run: runResult,
    });
});
