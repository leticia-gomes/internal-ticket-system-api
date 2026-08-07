import { Router } from 'express';

import { AuthMiddleware } from '../../../shared/auth/auth.middleware.js';

import { CreateTicketController } from '../use-cases/create-ticket/create-ticket.controller.js';
import { ListTicketsController } from '../use-cases/list-tickets/list-tickets.controller.js';
import { GetTicketController } from '../use-cases/get-ticket/get-ticket.controller.js';
import { UpdateTicketController } from '../use-cases/update-ticket/update-ticket.controller.js';
import { DeleteTicketController } from '../use-cases/delete-ticket/delete-ticket.controller.js';
import { CreateCommentController } from '../../ticket-comment/use-cases/create-comment/create-comment.controller.js';

export const ticketRoutes = Router();

const authMiddleware = new AuthMiddleware();

const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();
const getTicketController = new GetTicketController();
const updateTicketController = new UpdateTicketController();
const deleteTicketController = new DeleteTicketController();

const createCommentController = new CreateCommentController();

ticketRoutes.use(authMiddleware.handle.bind(authMiddleware));

ticketRoutes.post('/', createTicketController.handle.bind(createTicketController));

ticketRoutes.get('/', listTicketsController.handle.bind(listTicketsController));

ticketRoutes.get('/:id', getTicketController.handle.bind(getTicketController));

ticketRoutes.patch('/:id', updateTicketController.handle.bind(updateTicketController));

ticketRoutes.delete('/:id', deleteTicketController.handle.bind(deleteTicketController));

ticketRoutes.post('/:id/comments', createCommentController.handle.bind(createCommentController));