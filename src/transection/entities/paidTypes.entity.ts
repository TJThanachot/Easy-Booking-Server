import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transections } from './transection.entity';

@Entity('paidTypes')
export class PaidTypes {
  @PrimaryGeneratedColumn()
  id: number;

  //send PK to Rooms
  @OneToMany(() => Transections, (transections) => transections.paid_type_id)
  transections: Transections[];

  @Column({ length: 15 })
  type_name: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
