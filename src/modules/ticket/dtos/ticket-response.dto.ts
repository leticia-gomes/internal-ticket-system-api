import { TicketPriority } from '../enums/ticket-priority.enum.js';
import { TicketStatus } from '../enums/ticket-status.enum.js';
import { UserRole } from '../../user/enum/user-role.enum.js';

export interface TicketResponseDto {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;

  createdBy: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };

  assignedTo: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  } | null;

  createdAt: Date;
  updatedAt: Date;
}