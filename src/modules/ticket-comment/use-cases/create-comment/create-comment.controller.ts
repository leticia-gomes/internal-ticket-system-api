import { Request, Response } from 'express';

import { createCommentSchema } from './create-comment.schema.js';

import { CreateCommentUseCase } from './create-comment.use-case.js';

export class CreateCommentController {
  async handle(request: Request, response: Response) {
    const data = createCommentSchema.parse(request.body);

    const userId = request.user?.id ?? 0;

    const useCase = new CreateCommentUseCase();

    const comment = await useCase.execute(
      Number(request.params.id),

      userId,

      data,
    );

    return response.status(201).json(comment);
  }
}
