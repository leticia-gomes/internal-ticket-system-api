import { Request, Response } from 'express';

import { createTicketSchema } from './create-ticket.schema.js';
import { CreateTicketUseCase } from './create-ticket.use-case.js';


export class CreateTicketController {

  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {


    const data =
      createTicketSchema.parse(
        request.body
      );


    const useCase =
      new CreateTicketUseCase();


    const ticket =
      await useCase.execute(
        data,
        request.user!.id
      );


    return response
      .status(201)
      .json(ticket);

  }

}