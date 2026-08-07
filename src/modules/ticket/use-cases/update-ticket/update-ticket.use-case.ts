import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';
import { socketService } from '../../../../shared/socket/socket.service.js';
import { UserRepository } from '../../../user/repositories/user.repository.js';
import { TicketRepository } from '../../repositories/ticket.repository.js';
import { UpdateTicketDto } from './update-ticket.schema.js';

export class UpdateTicketUseCase {
  constructor(
    private readonly ticketRepository = new TicketRepository(),
    private readonly userRepository = new UserRepository(),
  ) {}

  async execute(id: number, data: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findByIdForUpdate(id);

    if (!ticket) {
      throw new AppError(translate('ticket.notFound'), 404, 'TICKET_NOT_FOUND');
    }

    if (data.assignedToId !== undefined) {
      if (data.assignedToId !== null) {
        const user = await this.userRepository.findById(data.assignedToId);

        if (!user) {
          throw new AppError(translate('user.notFound'), 404, 'USER_NOT_FOUND');
        }
      }
    }

    Object.assign(ticket, data);

    const response = await this.ticketRepository.save(ticket);

    if (!response) {
      throw new AppError(translate('ticket.notFound'), 404, 'TICKET_NOT_FOUND');
    }

    socketService.emitTicketUpdated(response);

    return response;
  }
}
