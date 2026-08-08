import { hash } from 'bcryptjs';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../../app.js';
import { Ticket } from '../../modules/ticket/entities/ticket.entity.js';
import { TicketPriority } from '../../modules/ticket/enums/ticket-priority.enum.js';
import { TicketStatus } from '../../modules/ticket/enums/ticket-status.enum.js';
import { User } from '../../modules/user/entities/user.entity.js';
import { UserRole } from '../../modules/user/enum/user-role.enum.js';
import { TestDataSource } from '../database/test-data-source.js';

describe('Tickets integration', () => {
  it('should create a ticket and persist it in the database', async () => {
    const password = 'Password123!';

    const userRepository = TestDataSource.getRepository(User);
    const ticketRepository = TestDataSource.getRepository(Ticket);

    const passwordHash = await hash(password, 4);

    const user = await userRepository.save({
      name: 'Ticket Creator',
      email: 'creator@example.com',
      passwordHash,
      role: UserRole.REQUESTER,
      isActive: true,
    });

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password,
      });

    expect(loginResponse.status).toBe(200);

    const accessToken = loginResponse.body.accessToken;

    const response = await request(app)
      .post('/tickets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Integration test ticket',
        description: 'Ticket created during an integration test',
        priority: TicketPriority.HIGH,
      });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      title: 'Integration test ticket',
      description: 'Ticket created during an integration test',
      priority: TicketPriority.HIGH,
      status: TicketStatus.OPEN,
      createdById: user.id,
      assignedToId: null,
    });

    expect(response.body.id).toEqual(expect.any(Number));

    const persistedTicket = await ticketRepository.findOne({
      where: {
        id: response.body.id,
      },
    });

    expect(persistedTicket).not.toBeNull();

    expect(persistedTicket).toMatchObject({
      id: response.body.id,
      title: 'Integration test ticket',
      description: 'Ticket created during an integration test',
      priority: TicketPriority.HIGH,
      status: TicketStatus.OPEN,
      createdById: user.id,
      assignedToId: null,
      isActive: true,
    });
  });
});