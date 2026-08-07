import { TicketPriority } from '../../enums/ticket-priority.enum.js';

export interface CreateTicketDto {
  title: string;
  description: string;
  priority?: TicketPriority;
  assignedToId?: number;
}