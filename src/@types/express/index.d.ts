import { AuthenticatedUser } from '../../shared/auth/authenticated-user.interface.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};