import { z } from 'zod';

import { TicketPriority } from '../../enums/ticket-priority.enum.js';
import { TicketStatus } from '../../enums/ticket-status.enum.js';

export const listTicketsSchema = z.object({
  status: z.enum(TicketStatus).optional(),
  priority: z.enum(TicketPriority).optional(),
});

export type ListTicketsDto = z.infer<typeof listTicketsSchema>;
