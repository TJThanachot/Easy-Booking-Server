import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Bookings } from 'src/booking/entities/booking.entity';
import { Transections } from 'src/transection/entities/transection.entity';
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  //send PK to Bookings
  @OneToMany(() => Bookings, (bookings) => bookings.user_id)
  bookings: Bookings[];

  //send PK to Bookings
  @OneToMany(() => Transections, (transections) => transections.user_id)
  transections: Transections[];

  // FK role_id
  @Column({ name: 'role_id' })
  role_id: number;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn({ name: 'role_id' })
  role: Roles;
  // end FK role_id

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

  @Column({ length: 45, nullable: true })
  google_id: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
