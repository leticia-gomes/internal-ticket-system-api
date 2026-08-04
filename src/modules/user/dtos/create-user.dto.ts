import { UserRole } from "../enum/user-role.enum.js";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}