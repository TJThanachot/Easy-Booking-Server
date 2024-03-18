import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bookings } from './booking.entity';
import { Rooms } from './rooms.entity';
import { Transections } from 'src/transection/entities/transection.entity';

@Entity('statusLookups')
export class StatusLookups {
  @PrimaryGeneratedColumn()
  id: number;
  //send PK to Bookings
  @OneToMany(() => Bookings, (bookings) => bookings.status_lookup_id)
  bookings: Bookings[];

  //send PK to Rooms
  @OneToMany(() => Rooms, (rooms) => rooms.status_lookup_id)
  rooms: Rooms[];

  //send PK to Transections
  @OneToMany(
    () => Transections,
    (transections) => transections.status_lookup_id,
  )
  transections: Transections[];

  @Column({ length: 15 })
  type: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
