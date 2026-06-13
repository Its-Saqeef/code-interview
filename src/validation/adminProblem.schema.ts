import { z } from 'zod';

export const adminProblemSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  timeLimit: z.number().int().min(1, 'Time limit must be at least 1 ms'),
  memoryLimit: z.number().int().min(1, 'Memory limit must be at least 1 MB'),
  tags: z.array(z.string().trim().min(1)).min(1, 'Add at least one tag'),
  constraints: z.array(z.string().trim().min(1)).min(1, 'Add at least one constraint'),
  hints: z.array(z.string().trim().min(1)).min(1, 'Add at least one hint'),
  examples: z
    .array(
      z.object({
        input: z.string().trim().min(1, 'Example input is required'),
        output: z.string().trim().min(1, 'Example output is required'),
        explanation: z.string().trim().optional(),
      }),
    )
    .min(1, 'Add at least one example'),
  starterCode: z.record(z.string(), z.string()),
  badges: z.array(z.string().trim().min(1)),
  status: z.enum(['draft', 'published']),
  imageUrl: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, 'Image URL must be valid'),
  recommendedMinutes: z.number().int().min(1).optional(),
  testCases: z
    .array(
      z.object({
        input: z.string().trim().min(1, 'Test case input is required'),
        expectedOutput: z.string().trim().min(1, 'Test case output is required'),
        isPublic: z.boolean(),
      }),
    )
    .min(1, 'Add at least one test case'),
});

export type AdminProblemFormData = z.infer<typeof adminProblemSchema>;

export function validateAdminProblem(data: unknown) {
  return adminProblemSchema.safeParse(data);
}
