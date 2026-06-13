import { and, count, desc, eq, sql } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { Problems, Submissions } from "../db/schema.ts";

export async function getUserProfileStats(userId: string) {
    const [submissionStats] = await db
        .select({
            totalSubmissions: count(),
            passedSubmissions: count(
                sql`case when ${Submissions.status} = 'passed' then 1 end`,
            ),
        })
        .from(Submissions)
        .where(eq(Submissions.userId, userId));

    const [solvedStats] = await db
        .select({
            solvedCount: sql<number>`count(distinct ${Submissions.problemId})`.mapWith(Number),
        })
        .from(Submissions)
        .where(and(eq(Submissions.userId, userId), eq(Submissions.status, "passed")));

    const totalSubmissions = Number(submissionStats?.totalSubmissions ?? 0);
    const passedSubmissions = Number(submissionStats?.passedSubmissions ?? 0);
    const solvedCount = Number(solvedStats?.solvedCount ?? 0);
    const winRate = totalSubmissions > 0
        ? Number(((passedSubmissions / totalSubmissions) * 100).toFixed(1))
        : null;

    return {
        solvedCount,
        totalSubmissions,
        passedSubmissions,
        winRate,
    };
}

export async function getRecentSubmissionsForUser(userId: string, limit = 10) {
    const rows = await db.query.Submissions.findMany({
        where: eq(Submissions.userId, userId),
        orderBy: [desc(Submissions.createdAt)],
        limit,
        with: {
            problem: {
                columns: {
                    title: true,
                    slug: true,
                },
            },
        },
    });

    return rows.map((row) => ({
        id: row.id,
        status: row.status,
        problem: row.problem.title,
        slug: row.problem.slug,
        language: row.language,
        runtimeMs: row.runtimeMs,
        createdAt: row.createdAt,
        passedTestCases: row.passedTestCases,
        totalTestCases: row.totalTestCases,
    }));
}

export async function getLanguageBreakdownForUser(userId: string) {
    const rows = await db
        .select({
            language: Submissions.language,
            total: count(),
        })
        .from(Submissions)
        .where(eq(Submissions.userId, userId))
        .groupBy(Submissions.language)
        .orderBy(sql`count(*) desc`)
        .limit(4);

    const grandTotal = rows.reduce((sum, row) => sum + Number(row.total), 0);

    return rows.map((row) => ({
        name: row.language,
        count: Number(row.total),
        pct: grandTotal > 0 ? Math.round((Number(row.total) / grandTotal) * 100) : 0,
    }));
}
