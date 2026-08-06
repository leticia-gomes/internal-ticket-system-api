import { Request, Response } from 'express';

import { DeleteTicketUseCase } from './delete-ticket.use-case.js';

export class DeleteTicketController {

  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {

    const useCase = new DeleteTicketUseCase();

    await useCase.execute(Number(request.params.id));

    return response
      .status(204)
      .send();
  }

}