import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Roles } from './roles.entity'; // Import the Roles entity

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 15 })
  phone_number: string;

  @Column({ length: 20 })
  email: string;

  @Column({ length: 15 })
  nationality: string;

  @Column({ name: 'role_id' })
  role_id: number;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @Column({ length: 45, nullable: true })
  google_id: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
