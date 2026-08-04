import { z } from 'zod';

import { validationMessage } from '../../../shared/validation/validation-messages.js';

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
        .string({
            error: validationMessage.required('email')
        })
        .trim()
        .email({
            error: validationMessage.email('email')
        })
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

    roleId: z
        .number({
            error: validationMessage.number('roleId')
        })
        .int({
            error: validationMessage.integer('roleId')
        })
        .positive({
            error: validationMessage.positive('roleId')
        })
});

export type CreateUserInput = z.infer<typeof createUserSchema>;