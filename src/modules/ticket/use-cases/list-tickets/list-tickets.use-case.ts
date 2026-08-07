import { TicketMapper } from '../../mappers/ticket.mapper.js';
import { TicketRepository } from '../../repositories/ticket.repository.js';
import { ListTicketsDto } from './list-tickets.schema.js';

export class ListTicketsUseCase {

  constructor(
    private readonly ticketRepository =
      new TicketRepository()
  ) {}


  async execute(filters: ListTicketsDto) {

    const tickets = await this.ticketRepository.findAll(filters);

    return tickets.map(TicketMapper.toResponse);

  }

}