import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm';

import { Ticket } from '../../ticket/entities/ticket.entity.js';
import { User } from '../../user/entities/user.entity.js';

@Entity('ticket_comments')
export class TicketComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text'
  })
  content!: string;

  @Column({
    name: 'ticket_id',
    type: 'int'
  })
  ticketId!: number;

  @ManyToOne(() => Ticket, ticket => ticket.comments, {
    nullable: false
  })
  @JoinColumn({
    name: 'ticket_id',
    foreignKeyConstraintName: 'fk_ticket_comments_ticket'
  })
  ticket!: Relation<Ticket>;

  @Column({
    name: 'user_id',
    type: 'int'
  })
  userId!: number;

  @ManyToOne(() => User, user => user.comments, {
    nullable: false
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_ticket_comments_user'
  })
  user!: Relation<User>;

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
}