import {
    pgTable,
    text,
    varchar,
    timestamp,
    uuid,
    jsonb,
    integer,
    boolean,
    primaryKey,
    index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Shared types ───────────────────────────────────────────────────────────

export type ProblemExample = {
    input: string;
    output: string;
    explanation?: string;
};

export type StarterCode = Record<string, string>;

export type ProblemStatus = "draft" | "published";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type SubmissionStatus = "passed" | "failed" | "error" | "timeout";

export type UserProfile = {
    bio?: string | null;
    country?: string | null;
    githubUrl?: string | null;
};

// ─── Users ──────────────────────────────────────────────────────────────────

export const User = pgTable("User", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    email: varchar("email", { length: 255 }).unique(),
    role: varchar("role", { length: 50 }).notNull().default("user"),
    password: text("password").notNull(),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    country: text("country"),
    githubUrl: text("github_url"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const UserRelations = relations(User, ({ many }) => ({
    submissions: many(Submissions),
}));

// ─── Problems ───────────────────────────────────────────────────────────────

export const Problems = pgTable(
    "Problems",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        problemNumber: integer("problem_number").notNull().unique(),
        slug: text("slug").notNull().unique(),
        title: text("title").notNull(),
        difficulty: varchar("difficulty", { length: 8 }).notNull().$type<Difficulty>(),
        description: text("description").notNull(),
        constraints: text("constraints").array(),
        hints: text("hints").array(),
        examples: jsonb("examples").$type<ProblemExample[]>(),
        starterCode: jsonb("starter_code").$type<StarterCode>(),
        imageUrl: text("image_url"),
        recommendedMinutes: integer("recommended_minutes"),
        timeLimitMs: integer("time_limit_ms").notNull().default(1000),
        memoryLimitMb: integer("memory_limit_mb").notNull().default(256),
        badges: text("badges").array(),
        status: varchar("status", { length: 20 }).notNull().default("draft").$type<ProblemStatus>(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => [
        index("problems_status_idx").on(table.status),
        index("problems_difficulty_idx").on(table.difficulty),
    ],
);

export const ProblemsRelations = relations(Problems, ({ many }) => ({
    testCases: many(TestCases),
    problemTags: many(ProblemTags),
    submissions: many(Submissions),
    relatedFrom: many(ProblemRelations, { relationName: "sourceProblem" }),
    relatedTo: many(ProblemRelations, { relationName: "relatedProblem" }),
}));

// ─── Tags ───────────────────────────────────────────────────────────────────

export const Tags = pgTable("Tags", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
});

export const TagsRelations = relations(Tags, ({ many }) => ({
    problemTags: many(ProblemTags),
}));

export const ProblemTags = pgTable(
    "ProblemTags",
    {
        problemId: uuid("problem_id")
            .notNull()
            .references(() => Problems.id, { onDelete: "cascade" }),
        tagId: uuid("tag_id")
            .notNull()
            .references(() => Tags.id, { onDelete: "cascade" }),
    },
    (table) => [primaryKey({ columns: [table.problemId, table.tagId] })],
);

export const ProblemTagsRelations = relations(ProblemTags, ({ one }) => ({
    problem: one(Problems, {
        fields: [ProblemTags.problemId],
        references: [Problems.id],
    }),
    tag: one(Tags, {
        fields: [ProblemTags.tagId],
        references: [Tags.id],
    }),
}));

// ─── Test cases (judge) ─────────────────────────────────────────────────────

export const TestCases = pgTable(
    "TestCases",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        problemId: uuid("problem_id")
            .notNull()
            .references(() => Problems.id, { onDelete: "cascade" }),
        input: text("input").notNull(),
        expectedOutput: text("expected_output").notNull(),
        isPublic: boolean("is_public").notNull().default(true),
        order: integer("order").notNull().default(0),
    },
    (table) => [index("test_cases_problem_id_idx").on(table.problemId)],
);

export const TestCasesRelations = relations(TestCases, ({ one }) => ({
    problem: one(Problems, {
        fields: [TestCases.problemId],
        references: [Problems.id],
    }),
}));

// ─── Related problems ───────────────────────────────────────────────────────

export const ProblemRelations = pgTable(
    "ProblemRelations",
    {
        problemId: uuid("problem_id")
            .notNull()
            .references(() => Problems.id, { onDelete: "cascade" }),
        relatedProblemId: uuid("related_problem_id")
            .notNull()
            .references(() => Problems.id, { onDelete: "cascade" }),
    },
    (table) => [primaryKey({ columns: [table.problemId, table.relatedProblemId] })],
);

export const ProblemRelationsRelations = relations(ProblemRelations, ({ one }) => ({
    sourceProblem: one(Problems, {
        fields: [ProblemRelations.problemId],
        references: [Problems.id],
        relationName: "sourceProblem",
    }),
    relatedProblem: one(Problems, {
        fields: [ProblemRelations.relatedProblemId],
        references: [Problems.id],
        relationName: "relatedProblem",
    }),
}));

// ─── Submissions ────────────────────────────────────────────────────────────

export const Submissions = pgTable(
    "Submissions",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id")
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        problemId: uuid("problem_id")
            .notNull()
            .references(() => Problems.id, { onDelete: "cascade" }),
        language: varchar("language", { length: 50 }).notNull(),
        code: text("code").notNull(),
        status: varchar("status", { length: 20 }).notNull().$type<SubmissionStatus>(),
        runtimeMs: integer("runtime_ms"),
        memoryKb: integer("memory_kb"),
        passedTestCases: integer("passed_test_cases"),
        totalTestCases: integer("total_test_cases"),
        createdAt: timestamp("created_at").defaultNow(),
    },
    (table) => [
        index("submissions_user_id_idx").on(table.userId),
        index("submissions_problem_id_idx").on(table.problemId),
        index("submissions_created_at_idx").on(table.createdAt),
    ],
);

export const SubmissionsRelations = relations(Submissions, ({ one }) => ({
    user: one(User, {
        fields: [Submissions.userId],
        references: [User.id],
    }),
    problem: one(Problems, {
        fields: [Submissions.problemId],
        references: [Problems.id],
    }),
}));
