import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  Matches,
  IsEnum,
  IsNumber,
} from 'class-validator';
export class CreateTransectionDto {
  @IsNumber()
  booking_id: number;
  @IsNumber()
  paid_type_id: number;
  @IsNumber()
  total_price: number;
  @IsString()
  description: string;

  created_at: Date;
  updated_at: Date;
}
