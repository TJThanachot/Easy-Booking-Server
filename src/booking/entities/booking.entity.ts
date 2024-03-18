import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Rooms } from './rooms.entity';
import { StatusLookups } from './statusLookups.entity';
import { Transections } from 'src/transection/entities/transection.entity';
@Entity('bookings')
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;
  //send PK to Transections
  @OneToMany(() => Transections, (transections) => transections.booking_id)
  transections: Transections[];

  //   FK user_id
  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Users, (users) => users.bookings)
  @JoinColumn({ name: 'user_id' })
  users: Users;
  //  end FK user_id

  // FK room_id
  @Column({ name: 'room_id' })
  room_id: number;

  @ManyToOne(() => Rooms, (rooms) => rooms.bookings)
  @JoinColumn({ name: 'room_id' })
  rooms: Rooms;
  // end FK room_id

  //FK status_lookup_id
  @Column({ name: 'status_lookup_id' })
  status_lookup_id: number;

  @ManyToOne(() => StatusLookups, (status_lookup) => status_lookup.bookings)
  @JoinColumn({ name: 'status_lookup_id' })
  statusLookups: StatusLookups;
  // end FK status_lookup_id

  @Column({ type: 'timestamp' })
  check_in: Date;

  @Column({ type: 'timestamp' })
  check_out: Date;

  @Column({ type: 'integer' })
  total_price: number;

  @Column({ type: 'integer' })
  total_people: number;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
