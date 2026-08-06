import { Request, Response } from 'express';

import { GetTicketUseCase } from './get-ticket.use-case.js';

export class GetTicketController {

  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {

    const useCase =
      new GetTicketUseCase();

    const ticket =
      await useCase.execute(
        Number(request.params.id)
      );

    return response.status(200).json(ticket);

  }

}