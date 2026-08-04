import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source.js';
import { Role } from '../entities/role.entity.js';

export class RoleRepository {
  private readonly repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  async findBySlug(slug: string): Promise<Role | null> {
    return this.repository.findOneBy({
      slug,
      isActive: true
    });
  }
}