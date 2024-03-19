import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  Matches,
  IsEnum,
  IsNumber,
} from 'class-validator';
export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  id: number;
}
