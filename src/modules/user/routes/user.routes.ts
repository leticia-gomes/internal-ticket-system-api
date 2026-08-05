import { Router } from 'express';

import { CreateUserController } from '../controllers/create-user.controller.js';
import { AuthMiddleware } from '../../../shared/auth/auth.middleware.js';

export const userRoutes = Router();

const authMiddleware = new AuthMiddleware();

const createUserController = new CreateUserController();

userRoutes.use(
    authMiddleware.handle.bind(authMiddleware)
);

userRoutes.post(
    '/',
    createUserController.handle.bind(createUserController)
);