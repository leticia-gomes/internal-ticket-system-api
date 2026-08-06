import { Router } from 'express';

import { LoginAuthController } from '../use-cases/login/login.controller.js';

const authRoutes = Router();

const loginAuthController = new LoginAuthController();

authRoutes.post(
    '/login',
    loginAuthController.handle.bind(loginAuthController)
);

export { authRoutes };