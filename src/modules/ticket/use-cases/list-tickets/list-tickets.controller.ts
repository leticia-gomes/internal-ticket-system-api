import { Request, Response } from 'express';

import { ListTicketsUseCase } from './list-tickets.use-case.js';
import { listTicketsSchema } from './list-tickets.schema.js';

export class ListTicketsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filters = listTicketsSchema.parse(request.query);

    const useCase = new ListTicketsUseCase();

    const tickets = await useCase.execute(filters);

    return response.status(200).json(tickets);
  }
}
