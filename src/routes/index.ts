import { Router } from 'express';

import { userRoutes } from '../modules/user/routes/user.routes.js';
import { authRoutes } from '../modules/auth/routes/auth.routes.js';

export const routes = Router();

routes.use('/users', userRoutes);

routes.use('/auth', authRoutes);