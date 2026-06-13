export type ProblemExample = {
    input: string;
    output: string;
    explanation?: string;
};

export type StarterCode = Record<string, string>;

export type ProblemStatus = "draft" | "published";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type SubmissionStatus = "passed" | "failed" | "error" | "timeout";

export interface ProblemSummary {
    id: string;
    problemNumber: number;
    slug: string;
    title: string;
    difficulty: Difficulty;
    tags: string[];
    acceptanceRate: number | null;
    solved: boolean;
}

export interface ProblemDetail extends Omit<ProblemSummary, "acceptanceRate" | "tags"> {
    description: string;
    constraints: string[];
    hints: string[];
    examples: ProblemExample[];
    starterCode: StarterCode | null;
    imageUrl: string | null;
    recommendedMinutes: number | null;
    timeLimitMs: number;
    memoryLimitMb: number;
    badges: string[];
    tags: string[];
    testCases: Array<{
        id: string;
        input: string;
        expectedOutput: string;
        isPublic: boolean;
    }>;
    relatedProblems: Array<{
        id: string;
        problemNumber: number;
        slug: string;
        title: string;
        difficulty: Difficulty;
        description: string;
    }>;
    stats: {
        acceptanceRate: number | null;
        acceptance: string;
        totalSubmissions: number;
        popularLanguages: string[];
    };
    lastAttempt: {
        timeTakenSeconds: number;
        status: SubmissionStatus;
    } | null;
}
