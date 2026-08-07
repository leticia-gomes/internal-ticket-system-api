import { describe, expect, it } from 'vitest';

import { TestDataSource } from '../database/test-data-source.js';

describe('Test database', () => {
  it('should connect to the test database', async () => {
    expect(TestDataSource.isInitialized).toBe(true);
  });
});