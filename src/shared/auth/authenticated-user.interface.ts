import { UserRole } from '../../modules/user/enum/user-role.enum.js';

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}