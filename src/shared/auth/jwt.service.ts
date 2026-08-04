import jwt, { SignOptions } from 'jsonwebtoken';

import { environment } from '../../config/environment.js';
import { UserRole } from '../../modules/user/enum/user-role.enum.js';

interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}

export class JwtService {
    generateToken(payload: JwtPayload): string {
        return jwt.sign(
            payload, 
            environment.jwt.secret, 
            {
                expiresIn: environment.jwt.expiresIn,
            } as SignOptions
        );
    }

    verifyToken(token: string): JwtPayload {
        return jwt.verify(
            token,
            environment.jwt.secret
        ) as JwtPayload;
    }
}