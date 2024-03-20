import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rooms } from './rooms.entity';

@Entity('room_types')
export class RoomTypes {
  @PrimaryGeneratedColumn()
  id: number;

  // send PK to Rooms
  @OneToMany(() => Rooms, (rooms) => rooms.room_type_id)
  rooms: Rooms[];

  @Column({ length: 15 })
  type_name: string;

  @Column({ type: 'integer' })
  price_per_night: number;

  @Column({ type: 'integer' })
  max_people: number;

  @Column({ length: 255 })
  description: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
