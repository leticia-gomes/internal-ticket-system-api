import { z } from 'zod';

import { validationMessage } from '../../../../shared/i18n/validation-messages.js';
import { UserRole } from '../../enum/user-role.enum.js';

export const createUserSchema = z.object({
    name: z
        .string({
            error: validationMessage.required('name')
        })
        .trim()
        .min(3, {
            error: validationMessage.minLength('name', 3)
        })
        .max(150, {
            error: validationMessage.maxLength('name', 150)
        }),

    email: z
        .email({
            error: validationMessage.email('email')
        })
        .trim()
        .max(255, {
            error: validationMessage.maxLength('email', 255)
        })
        .transform(email => email.toLowerCase()),

    password: z
        .string({
            error: validationMessage.required('password')
        })
        .min(8, {
            error: validationMessage.minLength('password', 8)
        })
        .max(72, {
            error: validationMessage.maxLength('password', 72)
        }),

    role: z
        .enum(UserRole)
        .optional()
});

export type CreateUserInput = z.infer<typeof createUserSchema>;