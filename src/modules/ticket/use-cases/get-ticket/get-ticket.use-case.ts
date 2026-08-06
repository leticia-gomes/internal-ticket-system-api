import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';
import { TicketMapper } from '../../mappers/ticket.mapper.js';
import { TicketRepository } from '../../repositories/ticket.repository.js';

export class GetTicketUseCase {

  constructor(
    private readonly ticketRepository =
      new TicketRepository()
  ) {}

  async execute(id: number) {

    const ticket =
      await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(
        translate('ticket.notFound'),
        404,
        'TICKET_NOT_FOUND'
      );
    }

    return TicketMapper.toResponse(ticket);

  }

}