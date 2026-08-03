import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm';

import { User } from '../../user/entities/user.entity.js';

@Entity('roles')
export class Role {
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
    length: 255
  })
  description!: string;

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

  @OneToMany(() => User, user => user.role)
  users!: Relation<User[]>;
}