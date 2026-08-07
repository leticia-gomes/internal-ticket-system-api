import 'reflect-metadata';

import { createServer } from 'node:http';

import { Server } from 'socket.io';

import { app } from './app.js';
import { environment } from './config/environment.js';
import { AppDataSource } from './database/data-source.js';
import { socketService } from './shared/socket/socket.service.js';

async function startServer(): Promise<void> {
  try {
    await AppDataSource.initialize();

    console.log('Database connection established successfully.');

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: environment.application.frontendUrl,
        credentials: true,
      },
    });

    socketService.setIo(io);

    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      socketService.emit('server.connected', {
        message: 'Socket initialized',
      });

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    httpServer.listen(environment.application.port, () => {
      console.log(`Server running on http://localhost:${environment.application.port}`);
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

startServer();
