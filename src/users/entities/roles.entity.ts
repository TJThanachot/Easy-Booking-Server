import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];

  @Column({ length: 15 })
  roles_name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
