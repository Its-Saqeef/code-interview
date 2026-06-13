import { db } from "../db/connection.ts";
import { Submissions } from "../db/schema.ts";
import type { SubmissionStatus } from "../db/schema.ts";

interface CreateSubmissionInput {
    userId: string;
    problemId: string;
    language: string;
    code: string;
    passedTestCases: number;
    totalTestCases: number;
    runtimeMs?: number;
    memoryKb?: number;
}

function resolveSubmissionStatus(passedTestCases: number, totalTestCases: number): SubmissionStatus {
    return passedTestCases === totalTestCases ? "passed" : "failed";
}

export async function createSubmissionRecord(input: CreateSubmissionInput) {
    const status = resolveSubmissionStatus(input.passedTestCases, input.totalTestCases);

    const [submission] = await db.insert(Submissions).values({
        userId: input.userId,
        problemId: input.problemId,
        language: input.language,
        code: input.code,
        status,
        passedTestCases: input.passedTestCases,
        totalTestCases: input.totalTestCases,
        runtimeMs: input.runtimeMs,
        memoryKb: input.memoryKb,
    }).returning();

    return submission;
}
