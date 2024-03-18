import { Bookings } from 'src/booking/entities/booking.entity';
import { StatusLookups } from 'src/booking/entities/statusLookups.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaidTypes } from './paidTypes.entity';

@Entity('transections')
export class Transections {
  @PrimaryGeneratedColumn()
  id: number;

  //   FK user_id
  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Users, (users) => users.transections)
  @JoinColumn({ name: 'user_id' })
  users: Users;
  //  end FK user_id

  //   FK booking_id
  @Column({ name: 'booking_id' })
  booking_id: number;

  @ManyToOne(() => Bookings, (booking) => booking.transections)
  @JoinColumn({ name: 'booking_id' })
  booking: Bookings;
  //  end FK booking_id

  //FK status_lookup_id
  @Column({ name: 'status_lookup_id' })
  status_lookup_id: number;

  @ManyToOne(() => StatusLookups, (status_lookup) => status_lookup.transections)
  @JoinColumn({ name: 'status_lookup_id' })
  statusLookups: StatusLookups;
  // end FK status_lookup_id

  //FK paid_type_id
  @Column({ name: 'paid_type_id' })
  paid_type_id: number;

  @ManyToOne(() => PaidTypes, (paidtypes) => paidtypes.transections)
  @JoinColumn({ name: 'paid_type_id' })
  paidtypes: PaidTypes;
  // end FK paid_type_id

  @Column({ type: 'integer' })
  total_price: number;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
