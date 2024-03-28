import { Module } from '@nestjs/common';
import { TransectionService } from './transection.service';
import { TransectionController } from './transection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transections } from './entities/transection.entity';
import { PaidTypes } from './entities/paidTypes.entity';
import { Bookings } from 'src/booking/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transections, PaidTypes, Bookings])],
  controllers: [TransectionController],
  providers: [TransectionService],
})
export class TransectionModule {}
