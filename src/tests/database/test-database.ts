import { TestDataSource } from './test-data-source.js';

export async function setupTestDatabase(): Promise<void> {
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize();
  }

  await TestDataSource.runMigrations();
}

export async function clearTestDatabase(): Promise<void> {
  if (!TestDataSource.isInitialized) {
    return;
  }

  await TestDataSource.query('SET FOREIGN_KEY_CHECKS = 0');

  await TestDataSource.query('TRUNCATE TABLE ticket_history');
  await TestDataSource.query('TRUNCATE TABLE ticket_comments');
  await TestDataSource.query('TRUNCATE TABLE tickets');
  await TestDataSource.query('TRUNCATE TABLE users');

  await TestDataSource.query('SET FOREIGN_KEY_CHECKS = 1');
}

export async function closeTestDatabase(): Promise<void> {
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy();
  }
}