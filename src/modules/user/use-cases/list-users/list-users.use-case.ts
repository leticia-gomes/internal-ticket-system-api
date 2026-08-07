import { UserRepository } from '../../repositories/user.repository.js';

export class ListUsersUseCase {
  constructor(private readonly userRepository = new UserRepository()) {}

  async execute() {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }
}
