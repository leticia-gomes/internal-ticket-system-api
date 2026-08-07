import { Server } from 'socket.io';

export class SocketService {
  private io?: Server;

  setIo(io: Server): void {
    this.io = io;
  }

  emit(event: string, payload: unknown): void {
    this.io?.emit(event, payload);
  }
}

export const socketService = new SocketService();
