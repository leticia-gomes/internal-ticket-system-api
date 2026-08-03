import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm';

import { Ticket } from '../../ticket/entities/ticket.entity.js';

@Entity('ticket_statuses')
export class TicketStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true
  })
  slug!: string;

  @Column({
    type: 'varchar',
    length: 20
  })
  color!: string;

  @Column({
    name: 'display_order',
    type: 'int',
    default: 0
  })
  displayOrder!: number;

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

  @OneToMany(() => Ticket, ticket => ticket.status)
  tickets!: Relation<Ticket[]>;
}