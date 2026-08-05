import { compare } from 'bcryptjs';

import { AppError } from '../../../../shared/errors/app-error.js';
import { translate } from '../../../../shared/i18n/message-catalog.js';
import { UserRepository } from '../../../user/repositories/user.repository.js';
import { LoginAuthDto } from './login.dto.js';
import { JwtService } from '../../../../shared/auth/jwt.service.js';

interface LoginAuthResponse {
    accessToken: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export class LoginAuthService {
    constructor(
        private readonly userRepository = new UserRepository(),
        private readonly jwtService = new JwtService()
    ) { }

    async execute(data: LoginAuthDto): Promise<LoginAuthResponse> {

        const user = await this.userRepository.findByEmail(
            data.email
        );

        if (!user) {
            throw new AppError(
                translate('auth.invalidCredentials'),
                401,
                'AUTH_INVALID_CREDENTIALS'
            );
        }

        const passwordMatch = await compare(
            data.password,
            user.passwordHash
        );

        if (!passwordMatch) {
            throw new AppError(
                translate('auth.invalidCredentials'),
                401,
                'AUTH_INVALID_CREDENTIALS'
            );
        }

        const accessToken = this.jwtService.generateToken({
            sub: String(user.id),
            email: user.email,
            role: user.role,
        });

        if (!user.isActive) {
            throw new AppError(
                translate('auth.inactiveUser'),
                403,
                'AUTH_USER_INACTIVE'
            );
        }

        return {
            accessToken,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}