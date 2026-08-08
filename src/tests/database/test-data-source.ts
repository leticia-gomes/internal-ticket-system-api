import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { TicketComment } from '../../modules/ticket-comment/entities/ticket-comment.entity.js';
import { TicketHistory } from '../../modules/ticket-history/entities/ticket-history.entity.js';
import { Ticket } from '../../modules/ticket/entities/ticket.entity.js';
import { User } from '../../modules/user/entities/user.entity.js';

export const TestDataSource = new DataSource({
  type: 'mysql',

  host: process.env.TEST_DATABASE_HOST ?? 'localhost',
  port: Number(process.env.TEST_DATABASE_PORT ?? 3306),

  username: process.env.TEST_DATABASE_USERNAME ?? 'root',
  password: process.env.TEST_DATABASE_PASSWORD ?? '',

  database: process.env.TEST_DATABASE_NAME ?? 'internal_ticket_system_test',

  charset: 'utf8mb4',

  synchronize: false,
  logging: false,
  
  entities: [
    TicketComment,
    TicketHistory,
    Ticket,
    User,
  ],
  migrations: [
    `${process.cwd()}/src/database/migrations/*.{ts,js}`,
  ],
  migrationsTableName: 'migrations',
});