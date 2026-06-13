import { count, eq, inArray, sql } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { Submissions } from "../db/schema.ts";

export type ProblemSubmissionStats = {
    totalSubmissions: number;
    passedSubmissions: number;
    acceptanceRate: number | null;
};

export function computeAcceptanceRate(total: number, passed: number): number | null {
    if (total === 0) return null;
    return Number(((passed / total) * 100).toFixed(1));
}

export function formatAcceptancePercent(rate: number | null): string {
    return rate === null ? "—" : `${rate}%`;
}

export async function getSubmissionStatsByProblemIds(
    problemIds: string[],
): Promise<Map<string, ProblemSubmissionStats>> {
    const statsMap = new Map<string, ProblemSubmissionStats>();

    if (problemIds.length === 0) {
        return statsMap;
    }

    const rows = await db
        .select({
            problemId: Submissions.problemId,
            totalSubmissions: count(),
            passedSubmissions: count(
                sql`case when ${Submissions.status} = 'passed' then 1 end`,
            ),
        })
        .from(Submissions)
        .where(inArray(Submissions.problemId, problemIds))
        .groupBy(Submissions.problemId);

    for (const row of rows) {
        const total = Number(row.totalSubmissions);
        const passed = Number(row.passedSubmissions);
        statsMap.set(row.problemId, {
            totalSubmissions: total,
            passedSubmissions: passed,
            acceptanceRate: computeAcceptanceRate(total, passed),
        });
    }

    return statsMap;
}

export async function getSubmissionStatsForProblem(problemId: string): Promise<ProblemSubmissionStats> {
    const [row] = await db
        .select({
            totalSubmissions: count(),
            passedSubmissions: count(
                sql`case when ${Submissions.status} = 'passed' then 1 end`,
            ),
        })
        .from(Submissions)
        .where(eq(Submissions.problemId, problemId));

    const total = Number(row?.totalSubmissions ?? 0);
    const passed = Number(row?.passedSubmissions ?? 0);

    return {
        totalSubmissions: total,
        passedSubmissions: passed,
        acceptanceRate: computeAcceptanceRate(total, passed),
    };
}

export async function getPopularLanguagesForProblem(problemId: string): Promise<string[]> {
    const rows = await db
        .select({
            language: Submissions.language,
            total: count(),
        })
        .from(Submissions)
        .where(eq(Submissions.problemId, problemId))
        .groupBy(Submissions.language)
        .orderBy(sql`count(*) desc`)
        .limit(4);

    return rows.map((row) => row.language);
}
