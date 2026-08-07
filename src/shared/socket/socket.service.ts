import { Server } from 'socket.io';
import { SocketEvents } from './socket.events.js';

export class SocketService {
  private io?: Server;

  setIo(io: Server): void {
    this.io = io;
  }

  emit(event: string, payload: unknown): void {
    this.io?.emit(event, payload);
  }

  emitTicketCreated(ticket: unknown): void {
    this.emit(SocketEvents.TICKET_CREATED, ticket);
  }

  emitTicketUpdated(ticket: unknown): void {
    this.emit(SocketEvents.TICKET_UPDATED, ticket);
  }

  emitTicketDeleted(ticketId: number): void {
    this.emit(SocketEvents.TICKET_DELETED, {
      id: ticketId,
    });
  }

  emitCommentCreated(comment: unknown): void {
    this.emit(SocketEvents.COMMENT_CREATED, comment);
  }
}

export const socketService = new SocketService();
