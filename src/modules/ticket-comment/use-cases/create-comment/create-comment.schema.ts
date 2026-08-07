import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(1).max(2000),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;