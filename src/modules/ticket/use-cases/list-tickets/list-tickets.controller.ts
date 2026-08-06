import { Request, Response } from 'express';

import { ListTicketsUseCase } from './list-tickets.use-case.js';

export class ListTicketsController {

  async handle(request: Request, response: Response): Promise<Response> {

    const useCase = new ListTicketsUseCase();

    const tickets = await useCase.execute();

    return response
      .status(200)
      .json(tickets);

  }

}