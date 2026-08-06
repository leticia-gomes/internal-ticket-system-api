import { z } from 'zod';

import { TicketPriority } from '../../enums/ticket-priority.enum.js';

export const createTicketSchema = z.object({

  title: z
    .string()
    .min(3),

  description: z
    .string()
    .min(5),

  priority: z
    .enum(TicketPriority)
    .optional()

});