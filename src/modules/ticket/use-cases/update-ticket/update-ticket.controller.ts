import { Request, Response } from 'express';

import { updateTicketSchema } from './update-ticket.schema.js';
import { UpdateTicketUseCase } from './update-ticket.use-case.js';

export class UpdateTicketController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = updateTicketSchema.parse(request.body);

    const useCase = new UpdateTicketUseCase();

    const ticket = await useCase.execute(Number(request.params.id), data);

    return response.status(200).json(ticket);
  }
}
