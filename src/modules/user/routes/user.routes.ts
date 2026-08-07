import { Router } from 'express';

import { CreateUserController } from '../use-cases/create-user/create-user.controller.js';
import { AuthMiddleware } from '../../../shared/auth/auth.middleware.js';
import { ListUsersController } from '../use-cases/list-users/list-users.controller.js';

export const userRoutes = Router();

const authMiddleware = new AuthMiddleware();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

userRoutes.use(authMiddleware.handle.bind(authMiddleware));

userRoutes.post('/', createUserController.handle.bind(createUserController));

userRoutes.get('/', listUsersController.handle.bind(listUsersController));
