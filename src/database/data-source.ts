import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { environment } from '../config/environment.js';

import { TicketComment } from '../modules/ticket-comment/entities/ticket-comment.entity.js';
import { TicketHistory } from '../modules/ticket-history/entities/ticket-history.entity.js';
import { Ticket } from '../modules/ticket/entities/ticket.entity.js';
import { User } from '../modules/user/entities/user.entity.js';

export const AppDataSource = new DataSource({
  type: 'mysql',

  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.name,

  charset: 'utf8mb4',

  synchronize: false,
  logging: environment.nodeEnv === 'development',

  entities: [
    TicketComment, 
    TicketHistory, 
    Ticket, 
    User
  ],

  migrations: [`${process.cwd()}/src/database/migrations/*.{ts,js}`],
  migrationsTableName: 'migrations'
});