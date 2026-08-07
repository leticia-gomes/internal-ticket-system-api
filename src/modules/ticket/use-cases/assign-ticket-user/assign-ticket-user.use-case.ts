import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';

import { TicketRepository } from '../../repositories/ticket.repository.js';
import { UserRepository } from '../../../user/repositories/user.repository.js';

import type { AssignTicketUserDto } from './assign-ticket-user.schema.js';

export class AssignTicketUserUseCase {
  constructor(
    private readonly ticketRepository = new TicketRepository(),
    private readonly userRepository = new UserRepository(),
  ) {}

  async execute(ticketId: number, data: AssignTicketUserDto) {
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError(translate('ticket.notFound'), 404, 'TICKET_NOT_FOUND');
    }

    // Remove o responsável
    if (data.assignedToId === null) {
      ticket.assignedTo = null;

      await this.ticketRepository.save(ticket);

      return this.ticketRepository.findById(ticketId);
    }

    // Atribui um novo responsável
    const user = await this.userRepository.findById(data.assignedToId);

    if (!user) {
      throw new AppError(translate('user.notFound'), 404, 'USER_NOT_FOUND');
    }

    ticket.assignedTo = user;

    await this.ticketRepository.save(ticket);

    return this.ticketRepository.findById(ticketId);
  }
}
