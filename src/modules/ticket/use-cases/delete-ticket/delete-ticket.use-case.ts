import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';
import { socketService } from '../../../../shared/socket/socket.service.js';

import { TicketRepository } from '../../repositories/ticket.repository.js';

export class DeleteTicketUseCase {
  constructor(private readonly ticketRepository = new TicketRepository()) {}

  async execute(id: number): Promise<void> {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(translate('ticket.notFound'), 404, 'TICKET_NOT_FOUND');
    }

    await this.ticketRepository.deactivate(ticket);

    socketService.emitTicketDeleted(ticket.id);
  }
}
