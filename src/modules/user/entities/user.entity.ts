import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm';

import { Role } from '../../role/entities/role.entity.js';
import { TicketComment } from '../../ticket-comment/entities/ticket-comment.entity.js';
import { TicketHistory } from '../../ticket-history/entities/ticket-history.entity.js';
import { Ticket } from '../../ticket/entities/ticket.entity.js';

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
    name: 'role_id',
    type: 'int'
  })
  roleId!: number;

  @ManyToOne(() => Role, role => role.users, {
    nullable: false
  })
  @JoinColumn({
    name: 'role_id',
    foreignKeyConstraintName: 'fk_users_role'
  })
  role!: Relation<Role>;

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
  ticketHistory!: Relation<TicketHistory[]>;
}