import { Injectable } from '@nestjs/common';
import { CreateTransectionDto } from './dto/create-transection.dto';
import { UpdateTransectionDto } from './dto/update-transection.dto';

@Injectable()
export class TransectionService {
  create(createTransectionDto: CreateTransectionDto) {
    return 'This action adds a new transection';
  }

  findAll() {
    return `This action returns all transection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transection`;
  }

  update(id: number, updateTransectionDto: UpdateTransectionDto) {
    return `This action updates a #${id} transection`;
  }

  remove(id: number) {
    return `This action removes a #${id} transection`;
  }
}
