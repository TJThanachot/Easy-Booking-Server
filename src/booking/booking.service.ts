import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { FindByCheckInCheckOutDto } from './dto/utils-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from './entities/booking.entity';
import { Repository, ILike, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { RoomTypes } from './entities/roomTypes.entity';
import { Rooms } from './entities/rooms.entity';
import { calTotalPrice, mapRoomtype } from 'src/utils/funcUtils';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
    @InjectRepository(RoomTypes)
    private roomTypesRepository: Repository<RoomTypes>,
    @InjectRepository(Rooms)
    private roomsRepository: Repository<Rooms>,
  ) {}

  async findAllTheLordRoomBooked(): Promise<any> {
    const today = new Date();
    today.setHours(7, 0, 0, 0);
    try {
      const result = await this.bookingsRepository.find({
        where: {
          room_id: 51, // 51 is the lord room
          check_in: MoreThanOrEqual(today),
        },
        select: {
          check_in: true,
          check_out: true,
        },
        order: { check_in: 'ASC' },
      });
      return result
        ? {
            checkInCheckOutList: result,
            message: 'Get all the lord room booked successful',
          }
        : { message: 'Not found any the lord room was booked!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTheLordBooking(
    userId: string,
    createBookingDto: CreateBookingDto,
  ): Promise<any> {
    const booking = createBookingDto;
    try {
      booking.user_id = userId;
      booking.created_at = new Date();
      booking.updated_at = new Date();
      booking.status_lookup_id = 5; //status 5 booked, 6 draft and 7 close
      booking.room_id = 51; // 51 is the lord room
      booking.total_price = calTotalPrice(
        booking.check_in,
        booking.check_out,
        booking.price_per_night,
      ); // comfrom funcUtils
      const result = await this.bookingsRepository.insert(booking);
      if (result.raw.length > 0) {
        return {
          message: `Booking the lord room saved successfully and your room number is ${51}.`,
        };
      }
      return { message: 'Booking the lord room saved unsuccessfully.' };
    } catch (error) {
      return { message: 'Error saving booking the lord room:' + error };
    }
  }

  async create(
    userId: string,
    createBookingDto: CreateBookingDto,
  ): Promise<any> {
    const booking = createBookingDto;
    let roomName: string = '';
    try {
      const findAvailableRoom = await this.roomsRepository.findOne({
        where: {
          status_lookup_id: 2, //status 1 booked, 2 available, 3 unavailable
          room_type_id: mapRoomtype(booking.description), // comfrom funcUtils
        },
      });
      if (findAvailableRoom) {
        booking.user_id = userId;
        booking.created_at = new Date();
        booking.updated_at = new Date();
        booking.status_lookup_id = 5; //status 5 booked, 6 draft and 7 close
        booking.room_id = findAvailableRoom?.id;
        booking.total_price = calTotalPrice(
          booking.check_in,
          booking.check_out,
          booking.price_per_night,
        ); // comfrom funcUtils
        roomName = findAvailableRoom?.room_name;
        findAvailableRoom.status_lookup_id = 1; //status 1 booked, 2 available, 3 unavailable
        await this.roomsRepository.save(findAvailableRoom);
      }
      const result = await this.bookingsRepository.insert(booking);
      if (result.raw.length > 0) {
        return {
          message: `Booking saved successfully and your room is ${roomName}.`,
        };
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

  async findAll(userId: string, pageNumber: number): Promise<any> {
    const limit: number = 3;
    const skip: number = Number((pageNumber - 1) * limit);
    try {
      const [result, count]: any | null =
        await this.bookingsRepository.findAndCount({
          where: { user_id: userId },
          relations: ['rooms', 'statusLookups'],
          order: { created_at: 'DESC' },
          take: limit,
          skip: skip,
        });
      return result
        ? {
            bookingList: result,
            count: Math.ceil(count / limit),
            message: 'Get all your bookings successful',
          }
        : { message: 'Not found any bookings!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(userId: string, bookingId: number) {
    try {
      const result: any = await this.bookingsRepository.delete({
        id: bookingId,
        user_id: userId,
      });
      return result?.affected > 0
        ? { message: `Removed a #${bookingId} booking id` }
        : { message: `Not found a #${bookingId} booking id` };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByKeyWords(
    userId: string,
    findByCheckInCheckOut: FindByCheckInCheckOutDto,
  ) {
    const key = {
      user_id: userId,
    };
    const { check_in, check_out } = findByCheckInCheckOut;
    try {
      const result: Bookings[] = await this.bookingsRepository.find({
        where: [
          {
            check_in: MoreThanOrEqual(new Date(check_in)),
            ...key,
          },
          {
            check_out: LessThanOrEqual(new Date(check_out)),
            ...key,
          },
        ],
        relations: ['rooms', 'statusLookups'],
      });
      return result
        ? {
            bookingList: result,
            message: 'Get your bookings by keywords successful',
          }
        : { message: 'Not found any bookings!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  // for landing page------------------------------------------------
  async findRoomTypes(): Promise<any> {
    try {
      const result: any = await this.roomTypesRepository.find();
      return result
        ? { roomTypesList: result, message: 'Get all room types successful' }
        : { message: 'Not found any room types!' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
