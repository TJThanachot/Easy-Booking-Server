import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransectionService } from './transection.service';
import { CreateTransectionDto } from './dto/create-transection.dto';
// import { UpdateTransectionDto } from './dto/update-transection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transection')
export class TransectionController {
  constructor(private readonly transectionService: TransectionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-transection')
  create(
    @Request() req: any,
    @Body() createTransectionDto: CreateTransectionDto,
  ) {
    return this.transectionService.create(
      req.user.userId,
      createTransectionDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUserId(@Request() req: any) {
    return this.transectionService.findAllByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':bookingId')
  findOnelByBookingId(@Param() param: any) {
    return this.transectionService.findOnelByBookingId(param.bookingId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('addmin')
  findAllByAddmin(@Request() req: any) {
    return this.transectionService.findAllByAddmin(
      req.user.userId,
      req.user.roleId,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transectionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransectionDto: UpdateTransectionDto,
  // ) {
  //   return this.transectionService.update(+id, updateTransectionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transectionService.remove(+id);
  // }
}
