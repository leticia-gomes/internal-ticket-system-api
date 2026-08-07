import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';
import { socketService } from '../../../../shared/socket/socket.service.js';

import { TicketRepository } from '../../../ticket/repositories/ticket.repository.js';

import { TicketCommentRepository } from '../../repositories/ticket-comment.repository.js';
import { CreateCommentDto } from './create-comment.schema.js';

export class CreateCommentUseCase {
  constructor(
    private readonly ticketRepository = new TicketRepository(),

    private readonly commentRepository = new TicketCommentRepository(),
  ) {}

  async execute(ticketId: number, userId: number, data: CreateCommentDto) {
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError(translate('ticket.notFound'), 404, 'TICKET_NOT_FOUND');
    }

    const response = await this.commentRepository.create({
      content: data.content,
      ticketId,
      userId,
    });

    socketService.emitCommentCreated(response);

    return response;
  }
}
