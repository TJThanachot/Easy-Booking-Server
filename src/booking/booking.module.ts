import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings } from './entities/booking.entity';
import { Users } from 'src/users/entities/user.entity';
import { Images } from './entities/images.entity';
import { RoomTypes } from './entities/roomTypes.entity';
import { RoomsImages } from './entities/roomImage.entity';
import { Rooms } from './entities/rooms.entity';
import { StatusLookups } from './entities/statusLookups.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bookings,
      Users,
      Images,
      RoomTypes,
      RoomsImages,
      Rooms,
      StatusLookups,
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
