import { Router } from 'express';

import { LoginAuthController } from '../controllers/login-auth.controller.js';

const authRoutes = Router();

const loginAuthController =
    new LoginAuthController();

authRoutes.post(
    '/login',
    loginAuthController.handle
);

export { authRoutes };