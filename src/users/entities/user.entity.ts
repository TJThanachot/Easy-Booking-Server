import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  password: string;

  @Column({ name: 'name', length: 30 })
  name: string;

  @Column({ name: 'phone_number', length: 15 })
  phoneNumber: string;

  @Column({ length: 20, unique: true })
  email: string;

  @Column({ length: 15 })
  nationality: string;

  @Column()
  role: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @Column({ length: 45, unique: true })
  googleId: string;
}
