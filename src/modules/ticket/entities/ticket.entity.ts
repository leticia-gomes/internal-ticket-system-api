import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Relation
} from 'typeorm';

import { TicketComment } from '../../ticket-comment/entities/ticket-comment.entity.js';
import { TicketHistory } from '../../ticket-history/entities/ticket-history.entity.js';
import { TicketPriority } from '../../ticket-priority/entities/ticket-priority.entity.js';
import { TicketStatus } from '../../ticket-status/entities/ticket-status.entity.js';
import { User } from '../../user/entities/user.entity.js';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  title!: string;

  @Column({
    type: 'text'
  })
  description!: string;

  @Column({
    name: 'status_id',
    type: 'int'
  })
  statusId!: number;

  @ManyToOne(() => TicketStatus, status => status.tickets, {
    nullable: false
  })
  @JoinColumn({
    name: 'status_id',
    foreignKeyConstraintName: 'fk_tickets_status'
  })
  status!: Relation<TicketStatus>;

  @Column({
    name: 'priority_id',
    type: 'int'
  })
  priorityId!: number;

  @ManyToOne(() => TicketPriority, priority => priority.tickets, {
    nullable: false
  })
  @JoinColumn({
    name: 'priority_id',
    foreignKeyConstraintName: 'fk_tickets_priority'
  })
  priority!: Relation<TicketPriority>;

  @Column({
    name: 'created_by_id',
    type: 'int'
  })
  createdById!: number;

  @ManyToOne(() => User, user => user.createdTickets, {
    nullable: false
  })
  @JoinColumn({
    name: 'created_by_id',
    foreignKeyConstraintName: 'fk_tickets_created_by_user'
  })
  createdBy!: Relation<User>;

  @Column({
    name: 'assigned_to_id',
    type: 'int',
    nullable: true
  })
  assignedToId!: number | null;

  @ManyToOne(() => User, user => user.assignedTickets, {
    nullable: true
  })
  @JoinColumn({
    name: 'assigned_to_id',
    foreignKeyConstraintName: 'fk_tickets_assigned_to_user'
  })
  assignedTo!: Relation<User> | null;

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

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true
  })
  deletedAt!: Date | null;

  @OneToMany(() => TicketComment, comment => comment.ticket)
  comments!: Relation<TicketComment[]>;

  @OneToMany(() => TicketHistory, history => history.ticket)
  history!: Relation<TicketHistory[]>;
}