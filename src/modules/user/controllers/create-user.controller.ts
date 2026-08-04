import { Request, Response } from 'express';

import { t } from '../../../shared/i18n/translate.js';

import { createUserSchema } from '../validations/create-user.schema.js';
import { CreateUserService } from '../services/create-user.service.js';

export class CreateUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {
    const validatedData = createUserSchema.parse(request.body);

    const createUserService = new CreateUserService();

    const user = await createUserService.execute(validatedData);

    return response.status(201).json({
      message: t('user.createdSuccessfully'),
      data: user
    });
  }
}