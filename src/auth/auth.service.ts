import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user: any = await this.usersService.findUsername(username);
      if (user && (await bcrypt.compare(password, user.password))) {
        return {
          message: 'Login success',
        };
      } else if (!user) {
        return { messgage: `Invalid Username` };
      } else {
        return { messgage: `Invalid Password` };
      }
    } catch (error) {
      return { message: error };
    }
  }
}
