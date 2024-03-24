import { Bookings } from '../entities/booking.entity';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  Matches,
  IsEnum,
  IsNumber,
} from 'class-validator';
export class CreateBookingDto {
  user_id: string;
  check_in: Date;
  check_out: Date;
  @IsNumber()
  price_per_night: number;
  @IsNumber()
  total_price: number;
  @IsNumber()
  total_people: number;
  @IsNumber()
  room_id: number;
  @IsString()
  description: string;
  @IsNumber()
  status_lookup_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(booking: Bookings) {
    this.user_id = booking.user_id;
    this.check_in = booking.check_in;
    this.check_out = booking.check_out;
    this.total_price = booking.total_price;
    this.total_people = booking.total_people;
    this.room_id = booking.room_id;
    this.description = booking.description;
    this.status_lookup_id = booking.status_lookup_id;
    this.created_at = booking.created_at;
    this.updated_at = booking.updated_at;
  }
}
