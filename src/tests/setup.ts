import {
  afterAll,
  beforeAll,
  beforeEach,
} from 'vitest';

import {
  clearTestDatabase,
  closeTestDatabase,
  setupTestDatabase,
} from './database/test-database.js';

beforeAll(async () => {
  await setupTestDatabase();
});

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await closeTestDatabase();
});