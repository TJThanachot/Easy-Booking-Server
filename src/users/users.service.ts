import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { LoginDto } from './dto/utils-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    const user: CreateUsersDto = createUsersDto;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const salt = await bcrypt.genSalt(10);
    // user password to hash password
    user.password = await bcrypt.hash(user.password, salt);

    try {
      await this.usersRepository.insert(user);
      return { message: 'Register success' };
    } catch (error) {
      return { message: error };
    }
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findUsername(username: string) {
    try {
      const user = await this.usersRepository.findOneBy({
        username: username,
      });
      return user;
    } catch (error) {
      return { message: error };
    }
  }

  update(id: number, updateUsersDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
