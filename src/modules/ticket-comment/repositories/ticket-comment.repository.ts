import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source.js';
import { TicketComment } from '../entities/ticket-comment.entity.js';

export class TicketCommentRepository {
  private readonly repository: Repository<TicketComment>;

  constructor() {
    this.repository = AppDataSource.getRepository(TicketComment);
  }

  async create(data: Partial<TicketComment>): Promise<TicketComment> {
    const comment = this.repository.create(data);

    return this.repository.save(comment);
  }

  async findByTicket(ticketId: number): Promise<TicketComment[]> {
    return this.repository.find({
      where: {
        ticketId,
        isActive: true,
      },

      relations: {
        user: true,
      },

      order: {
        createdAt: 'ASC',
      },
    });
  }
}
