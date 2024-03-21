import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransectionDto } from './dto/create-transection.dto';
import { UpdateTransectionDto } from './dto/update-transection.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transections } from './entities/transection.entity';

@Injectable()
export class TransectionService {
  constructor(
    @InjectRepository(Transections)
    private transectionRepository: Repository<Transections>,
  ) {}

  private readonly relations: string[] = [
    'bookings',
    'bookings.rooms',
    'bookings.rooms.statusLookups',
    'bookings.rooms.roomTypes',
  ];

  async create(
    userId: string,
    createTransectionDto: CreateTransectionDto,
  ): Promise<any> {
    const body = {
      ...createTransectionDto,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    };
    try {
      const result = await this.transectionRepository.insert(body);
      return result.raw.affectedRows > 0
        ? { message: 'Created a trasection successfully.' }
        : { message: 'Created a transection not success.' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByUserId(userId: string): Promise<any> {
    try {
      const result = await this.transectionRepository.find({
        where: {
          user_id: userId,
        },
        relations: this.relations,
      });
      return result.length > 0
        ? {
            message: 'Fetch all transections by user id successfully.',
            transectionList: result,
          }
        : { message: 'Not found data!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOnelByBookingId(bookingId: number): Promise<any> {
    try {
      const result = await this.transectionRepository.findOne({
        where: {
          booking_id: bookingId,
        },
        relations: this.relations,
      });
      return result
        ? {
            message: 'Fetch a transections by booking id successfully.',
            transection: result,
          }
        : { message: 'Not found data!' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByAddmin(userId: string, roleId: number): Promise<any> {
    // roleId 2 = addmin, 1 = user
    if (roleId === 2) {
      try {
        const result = await this.transectionRepository.find({
          relations: this.relations,
        });
        return result.length > 0
          ? {
              message: 'Fetch all transections by addmin successfully.',
              transectionList: result,
            }
          : { message: 'Not found data!' };
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new UnauthorizedException('User must be addmin.');
    }
  }
}
