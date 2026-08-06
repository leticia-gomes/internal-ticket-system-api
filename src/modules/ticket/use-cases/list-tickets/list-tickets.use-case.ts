import { TicketMapper } from '../../mappers/ticket.mapper.js';
import { TicketRepository } from '../../repositories/ticket.repository.js';

export class ListTicketsUseCase {

  constructor(
    private readonly ticketRepository =
      new TicketRepository()
  ) {}


  async execute() {

    const tickets = await this.ticketRepository.findAll();

    return tickets.map(TicketMapper.toResponse);

  }

}