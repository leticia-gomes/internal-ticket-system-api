import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source.js';
import { Ticket } from '../entities/ticket.entity.js';

export class TicketRepository {
  private readonly repository: Repository<Ticket>;

  constructor() {
    this.repository = AppDataSource.getRepository(Ticket);
  }

  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.repository.create(ticketData);

    return this.repository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.repository.find({
      relations: {
        createdBy: true,
        assignedTo: true,
      },

      where: {
        isActive: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: number): Promise<Ticket | null> {
    return this.repository.findOne({
      where: {
        id,
        isActive: true,
      },
      relations: {
        createdBy: true,
        assignedTo: true,
        comments: {
          user: true,
        },
      },
      order: {
        comments: {
          createdAt: 'ASC',
        },
      },
    });
  }

  async save(ticket: Ticket): Promise<Ticket> {
    return this.repository.save(ticket);
  }

  async deactivate(ticket: Ticket): Promise<void> {
    await this.repository.update(ticket.id, {
      isActive: false,
    });
  }
}
