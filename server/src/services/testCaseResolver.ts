import type { ProblemExample } from "../db/schema.ts";

export interface ResolvedTestCase {
    id: string;
    input: string;
    expectedOutput: string;
    isPublic: boolean;
}

interface DbTestCase {
    id: string;
    input: string;
    expectedOutput: string;
    isPublic: boolean;
}

export function examplesToTestCases(examples: ProblemExample[] | null | undefined): ResolvedTestCase[] {
    if (!examples?.length) {
        return [];
    }

    return examples.map((example, index) => ({
        id: `example-${index}`,
        input: example.input,
        expectedOutput: example.output,
        isPublic: true,
    }));
}

export function resolveTestCasesForRun(
    dbTestCases: DbTestCase[],
    examples: ProblemExample[] | null | undefined,
    mode: "run" | "submit",
): ResolvedTestCase[] {
    const fromDb = dbTestCases.map((testCase) => ({
        id: testCase.id,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        isPublic: testCase.isPublic,
    }));

    if (fromDb.length > 0) {
        if (mode === "submit") {
            return fromDb;
        }

        const publicCases = fromDb.filter((testCase) => testCase.isPublic);
        return publicCases.length > 0 ? publicCases : fromDb;
    }

    return examplesToTestCases(examples);
}
