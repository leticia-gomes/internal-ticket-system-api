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
      email: email.trim().toLowerCase(),
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      where: {
        isActive: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);

    return this.repository.save(user);
  }
}
