import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from 'typeorm';

import { Ticket } from '../../ticket/entities/ticket.entity.js';
import { User } from '../../user/entities/user.entity.js';

@Entity('ticket_history')
export class TicketHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 50
  })
  action!: string;

  @Column({
    name: 'field_name',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  fieldName!: string | null;

  @Column({
    name: 'previous_value',
    type: 'text',
    nullable: true
  })
  previousValue!: string | null;

  @Column({
    name: 'new_value',
    type: 'text',
    nullable: true
  })
  newValue!: string | null;

  @Column({
    name: 'ticket_id',
    type: 'int'
  })
  ticketId!: number;

  @ManyToOne(() => Ticket, ticket => ticket.history, {
    nullable: false
  })
  @JoinColumn({
    name: 'ticket_id',
    foreignKeyConstraintName: 'fk_ticket_history_ticket'
  })
  ticket!: Relation<Ticket>;

  @Column({
    name: 'changed_by_id',
    type: 'int'
  })
  changedById!: number;

  @ManyToOne(() => User, user => user.ticketHistory, {
    nullable: false
  })
  @JoinColumn({
    name: 'changed_by_id',
    foreignKeyConstraintName: 'fk_ticket_history_changed_by_user'
  })
  changedBy!: Relation<User>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime'
  })
  createdAt!: Date;
}