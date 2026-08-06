import { Ticket } from '../entities/ticket.entity.js';
import { TicketResponseDto } from '../dtos/ticket-response.dto.js';

export class TicketMapper {

  static toResponse(
    ticket: Ticket
  ): TicketResponseDto {

    return {

      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,

      createdBy: {
        id: ticket.createdBy.id,
        name: ticket.createdBy.name,
        email: ticket.createdBy.email,
        role: ticket.createdBy.role
      },

      assignedTo: ticket.assignedTo
        ? {
            id: ticket.assignedTo.id,
            name: ticket.assignedTo.name,
            email: ticket.assignedTo.email,
            role: ticket.assignedTo.role
          }
        : null,

      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt
    };
  }

}