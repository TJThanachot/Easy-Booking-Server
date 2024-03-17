import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUsersDto: CreateUsersDto) {
    return await this.usersService.register(createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const resutl = await this.usersService.findOneUser(req.user.userId);
    return resutl;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-profile')
  async updateProfile(
    @Request() req: any,
    @Body() updateUserDto: UpdateUsersDto,
  ) {
    return await this.usersService.updateProfile(
      req.user.userId,
      updateUserDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-profile')
  async remove(@Request() req: any, @Res({ passthrough: true }) res: any) {
    const result = await this.usersService.remove(req.user.userId);
    if (
      result.message === `Deleted a #${req.user.userId} user profile success`
    ) {
      res.redirect('/auth/logout');
      // res.json(result);
    } else {
      res.json(result);
    }
  }

  // for addmin---------------------------------------------------------------
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
