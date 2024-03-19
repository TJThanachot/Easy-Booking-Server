import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from './entities/booking.entity';
import { Repository } from 'typeorm';
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
  ) {}

  async create(
    userId: string,
    createBookingDto: CreateBookingDto,
  ): Promise<any> {
    const booking = createBookingDto;
    booking.user_id = userId;
    booking.created_at = new Date();
    booking.updated_at = new Date();
    booking.status_lookup_id = 5; //status 5 booked and 6 draft
    try {
      const result = await this.bookingsRepository.insert(createBookingDto);
      if (result.raw.affectedRows > 0) {
        return { message: 'Booking saved successfully.' };
      }
      return { message: 'Booking saved unsuccessfully.' };
    } catch (error) {
      return { message: 'Error saving booking:' + error };
    }
  }

  async update(
    userId: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<any> {
    try {
      const result: UpdateBookingDto | null =
        await this.bookingsRepository.findOneBy({
          id: updateBookingDto.id,
        });
      if (result) {
        const insert: UpdateBookingDto = { ...result, ...updateBookingDto };
        insert.updated_at = new Date();
        await this.bookingsRepository.save(insert);
        return { message: 'Booking updated successfully.' };
      }
      return { message: 'Booking updated unsuccessfully.' };
    } catch (error) {
      return { message: 'Error updating booking:' + error };
    }
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
