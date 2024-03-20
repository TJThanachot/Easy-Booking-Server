import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { GoogleDto, LoginDto, ProfileDto } from './dto/utils-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async register(createUsersDto: CreateUsersDto | GoogleDto) {
    const user: any = createUsersDto;
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user.created_at = new Date();
      user.updated_at = new Date();
    }
    try {
      await this.usersRepository.insert(user);
      return { message: 'Register success' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneUser(id: string): Promise<any> {
    try {
      const user: any = await this.usersRepository.findOne({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          phone_number: true,
          email: true,
          nationality: true,
          role_id: true,
        },
        relations: {
          role: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findEmail(email: string): Promise<any> {
    try {
      const user: LoginDto | null = await this.usersRepository.findOne({
        where: {
          email: email,
        },
        select: {
          email: true,
          password: true,
          id: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProfile(
    id: string,
    updateUsersDto: UpdateUsersDto,
  ): Promise<any> {
    let success;
    try {
      const result: any = await this.usersRepository.findOneBy({
        id: id,
      });
      if (result) {
        result.email = updateUsersDto.email;
        result.name = updateUsersDto.name;
        result.nationality = updateUsersDto.nationality;
        result.phone_number = updateUsersDto.phone_number;
        result.updated_at = new Date();
        success = await this.usersRepository.save(result);
      }
      return result
        ? { message: `Updated a #${id} user profile success` }
        : { message: `Not found a #${id} user profile.` };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const { affected } = await this.usersRepository.delete({ id });
      return affected
        ? { message: `Deleted a #${id} user profile success` }
        : { message: `Not found a #${id} user profile.` };
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find({
      relations: {
        role: true,
      },
    });
  }
}
