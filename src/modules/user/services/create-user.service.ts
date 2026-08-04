import { hash } from 'bcryptjs';

import { AppError } from '../../../shared/errors/app-error.js';
import { t } from '../../../shared/i18n/translate.js';   
import { RoleRepository } from '../../role/repositories/role.repository.js';
import { CreateUserDto } from '../dtos/create-user.dto.js';
import { User } from '../entities/user.entity.js';
import { UserRepository } from '../repositories/user.repository.js';

interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
  roleId: number;
  isActive: boolean;
  createdAt: Date;
}

export class CreateUserService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly roleRepository = new RoleRepository()
  ) {}

  async execute(data: CreateUserDto): Promise<CreateUserResponse> {
    const normalizedEmail = data.email.trim().toLowerCase();

    const existingUser =
      await this.userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new AppError(
        t('user.emailAlreadyExists'), 
        409, 
        'USER_EMAIL_ALREADY_REGISTERED');
    }

    const defaultRole =
      await this.roleRepository.findBySlug('requester');

    if (!defaultRole) {
      throw new AppError(
        t('role.defaultNotConfigured'),
        500,
        'ROLE_DEFAULT_NOT_CONFIGURED'
      );
    }

    const passwordHash = await hash(data.password, 12);

    const user: User = await this.userRepository.create({
      name: data.name.trim(),
      email: normalizedEmail,
      passwordHash,
      roleId: defaultRole.id,
      isActive: true
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      isActive: user.isActive,
      createdAt: user.createdAt
    };
  }
}