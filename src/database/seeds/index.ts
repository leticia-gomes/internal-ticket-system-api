import { AppDataSource } from '../data-source.js';
import { createUserSeed } from './user.seed.js';

async function runSeeds(): Promise<void> {
    try {
        await AppDataSource.initialize();

        await createUserSeed();

        await AppDataSource.destroy();

        console.log('Seeds executed successfully');
    } catch (error) {
        console.error('Seed execution failed:', error);

        process.exit(1);
    }
}

runSeeds();