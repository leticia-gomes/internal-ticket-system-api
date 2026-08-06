import { Request, Response } from 'express';

import { LoginUseCase } from './login.use-case.js';
import { loginAuthSchema } from './login.schema.js';

export class LoginAuthController {

    async handle(request: Request, response: Response): Promise<Response> {

        const validatedData = loginAuthSchema.parse(
            request.body
        );

        const loginUseCase = new LoginUseCase();

        const result = await loginUseCase.execute(
            validatedData
        );

        return response.status(200).json(result);
    }
}