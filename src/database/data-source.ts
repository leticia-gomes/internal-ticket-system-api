import 'reflect-metadata';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DataSource } from 'typeorm';

import { environment } from '../config/environment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'mysql',

  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.name,

  synchronize: false,
  logging: environment.nodeEnv === 'development',

  entities: [path.join(__dirname, '../entities/**/*.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations/**/*.{ts,js}')],
});

export default AppDataSource;