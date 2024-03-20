import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rooms } from './rooms.entity';
import { Images } from './images.entity';

@Entity('room_images')
export class RoomsImages {
  @PrimaryGeneratedColumn()
  id: number;

  // FK room_id
  @Column({ name: 'room_id' })
  room_id: number;

  @ManyToOne(() => Rooms, (rooms) => rooms.roomImages)
  @JoinColumn({ name: 'room_id' })
  rooms: Rooms;
  // end FK room_id

  // FK image_id
  @Column({ name: 'image_id' })
  image_id: number;

  @ManyToOne(() => Images, (images) => images.roomImages)
  @JoinColumn({ name: 'image_id' })
  images: Images;
  // end FK image_id
}
