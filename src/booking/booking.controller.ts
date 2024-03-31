import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Param,
  Request,
  UsePipes,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { FindByCheckInCheckOutDto } from './dto/utils-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-booking/the-lord-room')
  async createTheLordBooking(
    @Request() req: any,
    @Body() createBookingDto: any,
  ) {
    return await this.bookingService.createTheLordBooking(
      req.user.userId,
      createBookingDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-booking')
  async create(@Request() req: any, @Body() createBookingDto: any) {
    return await this.bookingService.create(req.user.userId, createBookingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-booking')
  async update(
    @Request() req: any,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return await this.bookingService.update(req.user.userId, updateBookingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('your-booking/:pageNumber')
  async findAll(@Request() req: any, @Param() param: any) {
    return this.bookingService.findAll(req.user.userId, param.pageNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search-a-booking')
  async findByKeyWords(
    @Request() req: any,
    @Body() findByCheckInCheckOutDto: FindByCheckInCheckOutDto,
  ) {
    return this.bookingService.findByKeyWords(
      req.user.userId,
      findByCheckInCheckOutDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-a-booking/:bookingId')
  async remove(@Request() req: any, @Param() param: any) {
    return await this.bookingService.remove(req.user.userId, param.bookingId);
  }

  @Get('room-types')
  async findRoomTypes() {
    return this.bookingService.findRoomTypes();
  }

  @Get('the-lord-room-booked')
  async findAllTheLordRoomBooked() {
    return this.bookingService.findAllTheLordRoomBooked();
  }
}
