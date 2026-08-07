import { socketService } from '../../../../shared/socket/socket.service.js';
import { TicketPriority } from '../../enums/ticket-priority.enum.js';
import { TicketStatus } from '../../enums/ticket-status.enum.js';
import { TicketRepository } from '../../repositories/ticket.repository.js';
import { CreateTicketDto } from './create-ticket.dto.js';

import { UserRepository } from '../../../user/repositories/user.repository.js';
import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';

export class CreateTicketUseCase {
  constructor(
    private readonly ticketRepository = new TicketRepository(),
    private readonly userRepository = new UserRepository(),
  ) {}

  async execute(data: CreateTicketDto, userId: number) {
    if (data.assignedToId) {
      const user = await this.userRepository.findById(data.assignedToId);

      if (!user) {
        throw new AppError(translate('user.notFound'), 404, 'USER_NOT_FOUND');
      }
    }

    const ticket = await this.ticketRepository.create({
      title: data.title,

      description: data.description,

      priority: data.priority ?? TicketPriority.MEDIUM,

      status: TicketStatus.OPEN,

      createdById: userId,

      assignedToId: data.assignedToId ?? null,
    });

    socketService.emitTicketCreated(ticket);

    return ticket;
  }
}
