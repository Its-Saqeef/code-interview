import express from "express";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { Problems, TestCases } from "../db/schema.ts";
import {
    formatAcceptancePercent,
    getPopularLanguagesForProblem,
    getSubmissionStatsByProblemIds,
    getSubmissionStatsForProblem,
} from "../services/problemStats.ts";
import { getSolvedProblemIdsForUser } from "../services/userProgress.ts";
import { getOptionalUserId } from "../utils/optionalAuth.ts";
import { AppError, catchAsync } from "../utils/errors.ts";

export const getProblems = catchAsync(async (req: express.Request, res: express.Response) => {
    const userId = await getOptionalUserId(req);

    const rows = await db.query.Problems.findMany({
        where: eq(Problems.status, "published"),
        orderBy: [desc(Problems.problemNumber)],
        with: {
            problemTags: {
                with: {
                    tag: true,
                },
            },
        },
    });

    const statsByProblemId = await getSubmissionStatsByProblemIds(rows.map((row) => row.id));
    const solvedProblemIds = userId
        ? await getSolvedProblemIdsForUser(userId, rows.map((row) => row.id))
        : new Set<string>();

    const problems = rows.map((problem) => {
        const stats = statsByProblemId.get(problem.id) ?? {
            totalSubmissions: 0,
            passedSubmissions: 0,
            acceptanceRate: null,
        };

        return {
            id: problem.id,
            slug: problem.slug,
            problemNumber: problem.problemNumber,
            title: problem.title,
            difficulty: problem.difficulty,
            tags: problem.problemTags.map((pt) => pt.tag.name),
            acceptanceRate: stats.acceptanceRate,
            acceptance: formatAcceptancePercent(stats.acceptanceRate),
            totalSubmissions: stats.totalSubmissions,
            solved: solvedProblemIds.has(problem.id),
        };
    });

    return res.status(200).json({
        success: true,
        message: "Problems fetched successfully",
        problems,
    });
});

export const getProblemDetail = catchAsync(async (req: express.Request, res: express.Response) => {
    const { slug } = req.params;

    if (typeof slug !== "string") {
        throw new AppError("Invalid problem slug", 400);
    }

    const userId = await getOptionalUserId(req);

    const problem = await db.query.Problems.findFirst({
        where: and(eq(Problems.slug, slug), eq(Problems.status, "published")),
        with: {
            problemTags: {
                with: {
                    tag: true,
                },
            },
            relatedFrom: {
                with: {
                    relatedProblem: true,
                },
            },
            testCases: {
                orderBy: [asc(TestCases.order)],
            },
        },
    });

    if (!problem) {
        throw new AppError("Problem not found", 404);
    }

    const [stats, popularLanguages, solved] = await Promise.all([
        getSubmissionStatsForProblem(problem.id),
        getPopularLanguagesForProblem(problem.id),
        userId ? getSolvedProblemIdsForUser(userId, [problem.id]).then((ids) => ids.has(problem.id)) : Promise.resolve(false),
    ]);

    const relatedProblems = problem.relatedFrom
        .map((relation) => relation.relatedProblem)
        .filter((related) => related.status === "published")
        .map((related) => ({
            id: related.id,
            problemNumber: related.problemNumber,
            slug: related.slug,
            title: related.title,
            difficulty: related.difficulty,
            description: related.description.length > 90
                ? `${related.description.slice(0, 90).trim()}...`
                : related.description,
        }));

    return res.status(200).json({
        success: true,
        message: "Problem detail fetched successfully",
        problem: {
            id: problem.id,
            slug: problem.slug,
            problemNumber: problem.problemNumber,
            title: problem.title,
            difficulty: problem.difficulty,
            description: problem.description,
            constraints: problem.constraints ?? [],
            hints: problem.hints ?? [],
            examples: problem.examples ?? [],
            starterCode: problem.starterCode ?? null,
            imageUrl: problem.imageUrl,
            recommendedMinutes: problem.recommendedMinutes,
            timeLimitMs: problem.timeLimitMs,
            memoryLimitMb: problem.memoryLimitMb,
            badges: problem.badges ?? [],
            tags: problem.problemTags.map((pt) => pt.tag.name),
            solved,
            testCases: problem.testCases.map((testCase) => ({
                id: testCase.id,
                input: testCase.input,
                expectedOutput: testCase.expectedOutput,
                isPublic: testCase.isPublic,
            })),
            relatedProblems,
            stats: {
                acceptanceRate: stats.acceptanceRate,
                acceptance: formatAcceptancePercent(stats.acceptanceRate),
                totalSubmissions: stats.totalSubmissions,
                popularLanguages,
            },
            lastAttempt: null,
        },
    });
});
