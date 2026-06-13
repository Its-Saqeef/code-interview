import { count, eq } from "drizzle-orm";
import { db } from "./connection.ts";
import { Problems, ProblemTags, Tags, TestCases } from "./schema.ts";
import type { Difficulty, ProblemExample, StarterCode } from "./schema.ts";

interface SeedProblem {
    problemNumber: number;
    slug: string;
    title: string;
    difficulty: Difficulty;
    description: string;
    constraints: string[];
    hints: string[];
    examples: ProblemExample[];
    starterCode: StarterCode;
    tags: string[];
    badges: string[];
    recommendedMinutes: number;
    testCases: Array<{
        input: string;
        expectedOutput: string;
        isPublic: boolean;
    }>;
}

const SEED_PROBLEMS: SeedProblem[] = [
    {
        problemNumber: 1,
        slug: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists.",
        ],
        hints: [
            "A brute force approach checks every pair — can you do better?",
            "What if you stored each number's index as you scan the array?",
            "Use a hash map to look up complement = target - nums[i] in O(1).",
        ],
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
        ],
        starterCode: {
            JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // Write your solution here
};
`,
            Python: `def twoSum(nums, target):
    # Write your solution here
    pass
`,
            Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}
`,
            "C++": `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};
`,
        },
        tags: ["Array", "Hash Table"],
        badges: ["Classic"],
        recommendedMinutes: 20,
        testCases: [
            { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]", isPublic: true },
            { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]", isPublic: true },
            { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]", isPublic: false },
        ],
    },
    {
        problemNumber: 2,
        slug: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        description:
            "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        constraints: [
            "n == height.length",
            "1 <= n <= 2 * 10^4",
            "0 <= height[i] <= 10^5",
        ],
        hints: [
            "Water at index i depends on the tallest bar to its left and right.",
            "Precompute left-max and right-max arrays for each index.",
            "Try a two-pointer approach to avoid extra space.",
        ],
        examples: [
            {
                input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
                output: "6",
                explanation: "The elevation map traps 6 units of rain water.",
            },
            {
                input: "height = [4,2,0,3,2,5]",
                output: "9",
            },
        ],
        starterCode: {
            JavaScript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  // Write your solution here
};
`,
            Python: `def trap(height):
    # Write your solution here
    pass
`,
            Java: `class Solution {
    public int trap(int[] height) {
        // Write your solution here
        return 0;
    }
}
`,
            "C++": `class Solution {
public:
    int trap(vector<int>& height) {
        // Write your solution here
        return 0;
    }
};
`,
        },
        tags: ["Array", "Two Pointers", "Stack"],
        badges: ["Featured"],
        recommendedMinutes: 45,
        testCases: [
            {
                input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
                expectedOutput: "6",
                isPublic: true,
            },
            { input: "height = [4,2,0,3,2,5]", expectedOutput: "9", isPublic: true },
            { input: "height = [1,0,1]", expectedOutput: "1", isPublic: false },
        ],
    },
    {
        problemNumber: 3,
        slug: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        description:
            "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
        constraints: [
            "n == height.length",
            "2 <= n <= 10^5",
            "0 <= height[i] <= 10^4",
        ],
        hints: [
            "Start with the widest container and move the shorter line inward.",
            "Moving the taller line cannot increase area.",
            "Use two pointers at both ends.",
        ],
        examples: [
            {
                input: "height = [1,8,6,2,5,4,8,3,7]",
                output: "49",
                explanation: "Lines at index 1 and 8 form a container with area 49.",
            },
            {
                input: "height = [1,1]",
                output: "1",
            },
        ],
        starterCode: {
            JavaScript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  // Write your solution here
};
`,
            Python: `def maxArea(height):
    # Write your solution here
    pass
`,
            Java: `class Solution {
    public int maxArea(int[] height) {
        // Write your solution here
        return 0;
    }
}
`,
            "C++": `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your solution here
        return 0;
    }
};
`,
        },
        tags: ["Array", "Two Pointers", "Greedy"],
        badges: [],
        recommendedMinutes: 30,
        testCases: [
            { input: "height = [1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isPublic: true },
            { input: "height = [1,1]", expectedOutput: "1", isPublic: true },
            { input: "height = [4,3,2,1,4]", expectedOutput: "16", isPublic: false },
        ],
    },
];

function toTagSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

async function upsertTag(tx: Parameters<Parameters<typeof db.transaction>[0]>[0], name: string) {
    const slug = toTagSlug(name);
    let tag = await tx.query.Tags.findFirst({
        where: eq(Tags.slug, slug),
    });

    if (!tag) {
        [tag] = await tx.insert(Tags).values({ name, slug }).returning();
    }

    return tag;
}

export async function seedProblems() {
    try {
        const [publishedCount] = await db
            .select({ total: count() })
            .from(Problems)
            .where(eq(Problems.status, "published"));

        if (Number(publishedCount?.total ?? 0) > 0) {
            console.log("Published problems already exist — skipping problem seed");
            return;
        }

        let seeded = 0;

        for (const seed of SEED_PROBLEMS) {
            const existing = await db.query.Problems.findFirst({
                where: eq(Problems.slug, seed.slug),
            });

            if (existing) {
                if (existing.status !== "published") {
                    await db.update(Problems)
                        .set({ status: "published" })
                        .where(eq(Problems.id, existing.id));
                    console.log(`Published existing problem: ${seed.slug}`);
                    seeded += 1;
                }
                continue;
            }

            await db.transaction(async (tx) => {
                const [created] = await tx.insert(Problems).values({
                    problemNumber: seed.problemNumber,
                    slug: seed.slug,
                    title: seed.title,
                    difficulty: seed.difficulty,
                    description: seed.description,
                    constraints: seed.constraints,
                    hints: seed.hints,
                    examples: seed.examples,
                    starterCode: seed.starterCode,
                    badges: seed.badges,
                    status: "published",
                    recommendedMinutes: seed.recommendedMinutes,
                    timeLimitMs: 2000,
                    memoryLimitMb: 256,
                }).returning();

                for (const tagName of seed.tags) {
                    const tag = await upsertTag(tx, tagName);
                    await tx.insert(ProblemTags).values({
                        problemId: created.id,
                        tagId: tag.id,
                    });
                }

                await tx.insert(TestCases).values(
                    seed.testCases.map((testCase, index) => ({
                        problemId: created.id,
                        input: testCase.input,
                        expectedOutput: testCase.expectedOutput,
                        isPublic: testCase.isPublic,
                        order: index,
                    })),
                );
            });

            console.log(`Seeded problem: ${seed.problemNumber}. ${seed.title}`);
            seeded += 1;
        }

        if (seeded > 0) {
            console.log(`Seeded ${seeded} published problems`);
        } else {
            console.log("No new problems seeded");
        }
    } catch (error) {
        console.error("Failed to seed problems:", error);
    }
}
