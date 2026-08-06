import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response
} from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/app-error.js';
import { translate } from '../i18n/message-catalog.js';

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: translate('common.validationFailed'),
      code: 'VALIDATION_ERROR',
      errors: error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  if (error instanceof AppError) {
  return response.status(error.statusCode).json({
    message: error.message,
    code: error.code
  });
}

  console.error(error);

  return response.status(500).json({
    message: translate('common.internalServerError'),
    code: 'INTERNAL_SERVER_ERROR'
  });
};