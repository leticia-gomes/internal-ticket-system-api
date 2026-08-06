import { Router } from 'express';

import { userRoutes } from '../modules/user/routes/user.routes.js';
import { authRoutes } from '../modules/auth/routes/auth.routes.js';
import { ticketRoutes } from '../modules/ticket/routes/ticket.routes.js';

export const routes = Router();

routes.use('/users', userRoutes);

routes.use('/auth', authRoutes);

routes.use('/tickets', ticketRoutes);