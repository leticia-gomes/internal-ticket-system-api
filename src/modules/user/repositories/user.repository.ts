import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source.js';
import { User } from '../entities/user.entity.js';

export class UserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({
      email: email.trim().toLowerCase()
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);

    return this.repository.save(user);
  }
}