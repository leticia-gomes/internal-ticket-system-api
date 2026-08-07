import { z } from 'zod';

export const AssignTicketUserSchema = z.object({
  assignedToId: z.number().nullable()
});

export type AssignTicketUserDto = z.infer<typeof AssignTicketUserSchema>;