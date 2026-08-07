import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';
import { socketService } from '../../../../shared/socket/socket.service.js';

import { TicketRepository } from '../../repositories/ticket.repository.js';
import { UpdateTicketDto } from './update-ticket.schema.js';

export class UpdateTicketUseCase {
  constructor(private readonly ticketRepository = new TicketRepository()) {}

  async execute(id: number, data: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(translate('ticket.notFound'), 404, 'TICKET_NOT_FOUND');
    }

    Object.assign(ticket, data);

    const response = await this.ticketRepository.save(ticket);

    socketService.emitTicketUpdated(response);

    return response;
  }
}
