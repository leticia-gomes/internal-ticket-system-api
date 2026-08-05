import { hash } from 'bcryptjs';

import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';   
import { CreateUserDto } from '../../use-cases/create-user/create-user.dto.js';
import { User } from '../../entities/user.entity.js';
import { UserRepository } from '../../repositories/user.repository.js';
import { UserRole } from '../../enum/user-role.enum.js';

interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export class CreateUserService {
  constructor(
    private readonly userRepository = new UserRepository()
  ) {}

  async execute(data: CreateUserDto): Promise<CreateUserResponse> {
    const normalizedEmail = data.email.trim().toLowerCase();

    const existingUser =
      await this.userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new AppError(
        translate('user.emailAlreadyExists'), 
        409, 
        'USER_EMAIL_ALREADY_REGISTERED');
    }

    const passwordHash = await hash(data.password, 12);

    const user: User = await this.userRepository.create({
      name: data.name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: data.role || UserRole.REQUESTER,
      isActive: true
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt
    };
  }
}