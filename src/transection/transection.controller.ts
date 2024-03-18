import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransectionService } from './transection.service';
import { CreateTransectionDto } from './dto/create-transection.dto';
import { UpdateTransectionDto } from './dto/update-transection.dto';

@Controller('transection')
export class TransectionController {
  constructor(private readonly transectionService: TransectionService) {}

  @Post()
  create(@Body() createTransectionDto: CreateTransectionDto) {
    return this.transectionService.create(createTransectionDto);
  }

  @Get()
  findAll() {
    return this.transectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransectionDto: UpdateTransectionDto) {
    return this.transectionService.update(+id, updateTransectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transectionService.remove(+id);
  }
}
