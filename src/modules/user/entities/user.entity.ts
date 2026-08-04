import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm';

import { TicketComment } from '../../ticket-comment/entities/ticket-comment.entity.js';
import { TicketHistory } from '../../ticket-history/entities/ticket-history.entity.js';
import { Ticket } from '../../ticket/entities/ticket.entity.js';
import { UserRole } from '../enum/user-role.enum.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 150
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  email!: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255
  })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.REQUESTER,
  })
  role!: UserRole;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true
  })
  isActive!: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime'
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime'
  })
  updatedAt!: Date;

  @OneToMany(() => Ticket, ticket => ticket.createdBy)
  createdTickets!: Relation<Ticket[]>;

  @OneToMany(() => Ticket, ticket => ticket.assignedTo)
  assignedTickets!: Relation<Ticket[]>;

  @OneToMany(() => TicketComment, comment => comment.user)
  comments!: Relation<TicketComment[]>;

  @OneToMany(() => TicketHistory, history => history.changedBy)
  ticketHistories!: Relation<TicketHistory[]>;
}