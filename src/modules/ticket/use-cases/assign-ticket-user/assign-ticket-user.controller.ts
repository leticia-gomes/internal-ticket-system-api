import { Request, Response } from 'express';

import { AssignTicketUserSchema } from './assign-ticket-user.schema.js';
import { AssignTicketUserUseCase } from './assign-ticket-user.use-case.js';

export class AssignTicketUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const data = AssignTicketUserSchema.parse(request.body);

    const useCase = new AssignTicketUserUseCase();

    const ticket = await useCase.execute(Number(request.params.id), data);

    return response.status(200).json(ticket);
  }
}