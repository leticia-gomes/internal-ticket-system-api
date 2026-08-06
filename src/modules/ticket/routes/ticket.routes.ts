import { Router } from 'express';

import { AuthMiddleware } from '../../../shared/auth/auth.middleware.js';
import { CreateTicketController } from '../use-cases/create-ticket/create-ticket.controller.js';
import { ListTicketsController } from '../use-cases/list-tickets/list-tickets.controller.js';

export const ticketRoutes = Router();

const authMiddleware = new AuthMiddleware();

const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();

ticketRoutes.use(
    authMiddleware.handle.bind(authMiddleware)
);

ticketRoutes.post(
    '/',
    createTicketController.handle.bind(createTicketController)
);

ticketRoutes.get(
    '/',
    listTicketsController.handle.bind(listTicketsController)
);

ticketRoutes.get(
    '/:id',
    createTicketController.handle.bind(createTicketController)
);

ticketRoutes.patch(
    '/:id',
    createTicketController.handle.bind(createTicketController)
);

ticketRoutes.delete(
    '/:id',
    createTicketController.handle.bind(createTicketController)
);