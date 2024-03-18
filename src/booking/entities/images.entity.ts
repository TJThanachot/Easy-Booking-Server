import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomsImages } from './roomImage.entity';

@Entity('images')
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  // send PK to RoomImages
  @OneToMany(() => RoomsImages, (roomImages) => roomImages.image_id)
  roomImages: RoomsImages[];

  @Column({ length: 100 })
  url: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
