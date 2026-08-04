import { z } from 'zod';

export const loginAuthSchema = z.object({
    email: z.email(),

    password: z
        .string()
        .min(6),
});