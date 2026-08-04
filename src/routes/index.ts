import { Router } from 'express';

import { userRoutes } from '../modules/user/routes/user.routes.js';

export const routes = Router();

routes.use('/users', userRoutes);