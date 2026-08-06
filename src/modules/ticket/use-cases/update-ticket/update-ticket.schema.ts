import { z } from 'zod';

import { TicketPriority } from '../../enums/ticket-priority.enum.js';
import { TicketStatus } from '../../enums/ticket-status.enum.js';


export const updateTicketSchema = z.object({

  title: z
    .string()
    .min(3)
    .optional(),

  description: z
    .string()
    .min(5)
    .optional(),

  status: z
    .enum(Object.values(TicketStatus) as [string, ...string[]])
    .optional(),

  priority: z
    .enum(Object.values(TicketPriority) as [string, ...string[]])
    .optional(),

  assignedToId: z
    .number()
    .nullable()
    .optional()

});


export type UpdateTicketDto =
  z.infer<typeof updateTicketSchema>;