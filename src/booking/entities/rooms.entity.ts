import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Bookings } from './booking.entity';
import { StatusLookups } from './statusLookups.entity';
import { RoomTypes } from './roomTypes.entity';
import { RoomsImages } from './roomImage.entity';

@Entity('rooms')
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;
  // send PK to Bookings
  @OneToMany(() => Bookings, (bookings) => bookings.room_id)
  bookings: Bookings[];

  // send PK to RoomImages
  @OneToMany(() => RoomsImages, (roomImages) => roomImages.room_id)
  roomImages: RoomsImages[];

  //FK status_lookup_id
  @Column({ name: 'status_lookup_id' })
  status_lookup_id: number;

  @ManyToOne(() => StatusLookups, (status_lookup) => status_lookup.rooms)
  @JoinColumn({ name: 'status_lookup_id' })
  statusLookups: StatusLookups;
  // end FK status_lookup_id

  //FK room_type_id
  @Column({ name: 'room_type_id' })
  room_type_id: number;

  @ManyToOne(() => RoomTypes, (roomTypes) => roomTypes.rooms)
  @JoinColumn({ name: 'room_type_id' })
  roomTypes: RoomTypes;
  // end FK room_type_id

  @Column({ length: 15 })
  room_name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
