import { hash } from 'bcryptjs';

import { AppDataSource } from '../data-source.js';
import { User } from '../../modules/user/entities/user.entity.js';
import { UserRole } from '../../modules/user/enum/user-role.enum.js';

export async function createUserSeed(): Promise<void> {

    const userRepository =
        AppDataSource.getRepository(User);

    const existingUser =
        await userRepository.findOneBy({
            email: 'admin@ticket.com'
        });

    if (existingUser) {
        console.log('Admin user already exists');
        return;
    }

    const passwordHash = await hash(
        '123456',
        12
    );

    const user = userRepository.create({
        name: 'System Administrator',
        email: 'admin@ticket.com',
        passwordHash,
        role: UserRole.ADMIN,
        isActive: true
    });

    await userRepository.save(user);

    console.log('Admin user created successfully');
}