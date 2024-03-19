import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Res,
  Request,
  UsePipes,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-booking')
  async create(
    @Request() req: any,
    @Body() createBookingDto: CreateBookingDto,
  ) {
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

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.bookingService.findOne(+id);
  }

  @Delete(':id')
  remove(id: string) {
    return this.bookingService.remove(+id);
  }
}
