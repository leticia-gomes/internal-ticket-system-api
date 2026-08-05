import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/app-error.js';
import { t } from '../i18n/translate.js';
import { JwtService } from './jwt.service.js';

export class AuthMiddleware {
    constructor(
        private readonly jwtService = new JwtService()
    ) { }

    handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): void {
        const authorization =
            request.headers.authorization;

        if (!authorization) {
            throw new AppError(
                t("auth.tokenNotProvided"),
                401,
                'AUTH_TOKEN_MISSING'
            );
        }

        const [type, token] =
            authorization.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new AppError(
                t("auth.invalidToken"),
                401,
                'AUTH_TOKEN_INVALID'
            );
        }

        const payload =
            this.jwtService.verifyToken(token);

        request.user = {
            id: Number(payload.sub),
            email: payload.email,
            role: payload.role
        };

        next();
    }
}