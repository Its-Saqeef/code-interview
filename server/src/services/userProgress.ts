import { and, eq, inArray } from "drizzle-orm";
import { db } from "../db/connection.ts";
import { Submissions } from "../db/schema.ts";

export async function getSolvedProblemIdsForUser(
    userId: string,
    problemIds: string[],
): Promise<Set<string>> {
    if (problemIds.length === 0) {
        return new Set();
    }

    const rows = await db
        .select({ problemId: Submissions.problemId })
        .from(Submissions)
        .where(
            and(
                eq(Submissions.userId, userId),
                eq(Submissions.status, "passed"),
                inArray(Submissions.problemId, problemIds),
            ),
        )
        .groupBy(Submissions.problemId);

    return new Set(rows.map((row) => row.problemId));
}
