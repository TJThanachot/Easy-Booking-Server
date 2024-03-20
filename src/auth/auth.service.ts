import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from 'src/users/dto/utils-users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GoogleDto } from 'src/users/dto/utils-users.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user: LoginDto = await this.usersService.findEmail(email);

      return user && (await bcrypt.compare(password, user.password))
        ? {
            email: user.email,
            userId: user.id,
          }
        : !user
          ? { message: `Invalid Email` }
          : { message: `Invalid Password` };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req: any): Promise<any> {
    if (!req.user) {
      throw new Error('Google login failed: No user information received.');
    }
    const { email, name, googleId } = req.user;
    const googleRes = new GoogleDto(email, name, googleId);
    let user = await this.usersService.findEmail(email);

    if (!user) {
      await this.usersService.register(googleRes);
      user = await this.usersService.findEmail(email);
    }
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
