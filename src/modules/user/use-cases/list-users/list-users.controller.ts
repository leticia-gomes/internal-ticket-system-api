import { Request, Response } from 'express';

import { ListUsersUseCase } from './list-users.use-case.js';

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new ListUsersUseCase();

    const users = await useCase.execute();

    return response.status(200).json(users);
  }
}
