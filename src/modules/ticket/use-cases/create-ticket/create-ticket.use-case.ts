import { TicketPriority } from '../../enums/ticket-priority.enum.js';
import { TicketStatus } from '../../enums/ticket-status.enum.js';
import { TicketRepository } from '../../repositories/ticket.repository.js';
import { CreateTicketDto } from './create-ticket.dto.js';


export class CreateTicketUseCase {

  constructor(
    private readonly ticketRepository =
      new TicketRepository()
  ) {}


  async execute(
    data: CreateTicketDto,
    userId: number
  ) {

    const ticket =
      await this.ticketRepository.create({

        title: data.title,

        description: data.description,

        priority: data.priority ?? TicketPriority.MEDIUM,

        status: TicketStatus.OPEN,

        createdById: userId

      });


    return ticket;

  }

}