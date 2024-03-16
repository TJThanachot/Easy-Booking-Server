import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ name: 'first_name', length: 20 })
  firstName: string;

  @Column({ name: 'last_name', length: 20 })
  lastName: string;

  @Column({ name: 'phone_number', length: 15 })
  phoneNumber: string;

  @Column({ length: 20, unique: true })
  email: string;

  @Column({ length: 15 })
  nationality: string;

  @Column()
  role: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
