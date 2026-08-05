import { Request, Response } from 'express';

import { translate } from '../../../../shared/i18n/message-catalog.js';

import { createUserSchema } from '../../use-cases/create-user/create-user.schema.js';
import { CreateUserService } from '../../use-cases/create-user/create-user.use-case.js';

export class CreateUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {
    const validatedData = createUserSchema.parse(request.body);

    const createUserService = new CreateUserService();

    const user = await createUserService.execute(validatedData);

    return response.status(201).json({
      message: translate('user.createdSuccessfully'),
      data: user
    });
  }
}