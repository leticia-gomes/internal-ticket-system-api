import { Request, Response } from 'express';

import { translate } from '../../../../shared/i18n/message-catalog.js';

import { createUserSchema } from '../../use-cases/create-user/create-user.schema.js';
import { CreateUserUseCase } from '../../use-cases/create-user/create-user.use-case.js';

export class CreateUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {
    const validatedData = createUserSchema.parse(request.body);

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute(validatedData);

    return response.status(201).json({
      message: translate('user.createdSuccessfully'),
      data: user
    });
  }
}