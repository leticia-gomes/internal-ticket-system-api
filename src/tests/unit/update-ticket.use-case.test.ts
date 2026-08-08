import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TicketPriority } from '../../modules/ticket/enums/ticket-priority.enum.js';
import { TicketStatus } from '../../modules/ticket/enums/ticket-status.enum.js';
import { TicketRepository } from '../../modules/ticket/repositories/ticket.repository.js';
import { UpdateTicketUseCase } from '../../modules/ticket/use-cases/update-ticket/update-ticket.use-case.js';
import { UserRepository } from '../../modules/user/repositories/user.repository.js';
import { socketService } from '../../shared/socket/socket.service.js';

const ticketRepositoryMock = {
  findByIdForUpdate: vi.fn(),
  save: vi.fn(),
} as unknown as TicketRepository;

const userRepositoryMock = {
  findById: vi.fn(),
} as unknown as UserRepository;

describe('UpdateTicketUseCase', () => {
  const useCase = new UpdateTicketUseCase(
    ticketRepositoryMock,
    userRepositoryMock,
  );

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(socketService, 'emitTicketUpdated').mockImplementation(
      vi.fn(),
    );
  });

  it('should update a ticket', async () => {
    const ticket = {
      id: 1,
      title: 'Old title',
      description: 'Old description',
      status: TicketStatus.OPEN,
      priority: TicketPriority.MEDIUM,
      createdById: 10,
      assignedToId: null,
    };

    const updatedTicket = {
      ...ticket,
      title: 'Updated title',
      description: 'Updated description',
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.HIGH,
    };

    ticketRepositoryMock.findByIdForUpdate = vi
      .fn()
      .mockResolvedValue(ticket);

    ticketRepositoryMock.save = vi
      .fn()
      .mockResolvedValue(updatedTicket);

    const result = await useCase.execute(1, {
      title: 'Updated title',
      description: 'Updated description',
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.HIGH,
    });

    expect(ticketRepositoryMock.findByIdForUpdate).toHaveBeenCalledWith(1);

    expect(ticketRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: 'Updated title',
        description: 'Updated description',
        status: TicketStatus.IN_PROGRESS,
        priority: TicketPriority.HIGH,
      }),
    );

    expect(result).toEqual(updatedTicket);

    expect(socketService.emitTicketUpdated).toHaveBeenCalledWith(
      updatedTicket,
    );
  });

  it('should throw when the ticket does not exist', async () => {
    ticketRepositoryMock.findByIdForUpdate = vi
      .fn()
      .mockResolvedValue(null);

    await expect(
      useCase.execute(999, {
        title: 'Updated title',
      }),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: 'TICKET_NOT_FOUND',
    });

    expect(ticketRepositoryMock.save).not.toHaveBeenCalled();

    expect(socketService.emitTicketUpdated).not.toHaveBeenCalled();
  });

  it('should throw when the assigned user does not exist', async () => {
    const ticket = {
      id: 1,
      title: 'Existing ticket',
      description: 'Existing description',
      status: TicketStatus.OPEN,
      priority: TicketPriority.MEDIUM,
      createdById: 10,
      assignedToId: null,
    };

    ticketRepositoryMock.findByIdForUpdate = vi
      .fn()
      .mockResolvedValue(ticket);

    userRepositoryMock.findById = vi
      .fn()
      .mockResolvedValue(null);

    await expect(
      useCase.execute(1, {
        assignedToId: 999,
      }),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: 'USER_NOT_FOUND',
    });

    expect(userRepositoryMock.findById).toHaveBeenCalledWith(999);

    expect(ticketRepositoryMock.save).not.toHaveBeenCalled();

    expect(socketService.emitTicketUpdated).not.toHaveBeenCalled();
  });

  it('should allow removing the assigned user', async () => {
    const ticket = {
      id: 1,
      title: 'Assigned ticket',
      description: 'Ticket description',
      status: TicketStatus.OPEN,
      priority: TicketPriority.MEDIUM,
      createdById: 10,
      assignedToId: 20,
    };

    const updatedTicket = {
      ...ticket,
      assignedToId: null,
    };

    ticketRepositoryMock.findByIdForUpdate = vi
      .fn()
      .mockResolvedValue(ticket);

    ticketRepositoryMock.save = vi
      .fn()
      .mockResolvedValue(updatedTicket);

    const result = await useCase.execute(1, {
      assignedToId: null,
    });

    expect(userRepositoryMock.findById).not.toHaveBeenCalled();

    expect(ticketRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        assignedToId: null,
      }),
    );

    expect(result).toEqual(updatedTicket);

    expect(socketService.emitTicketUpdated).toHaveBeenCalledWith(
      updatedTicket,
    );
  });
});