import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'), // Use the secret from environment variables
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<any> {
    // This payload will be the decrypted token payload you provided when signing the token
    return {
      email: payload.email,
      userId: payload.sub,
      roleId: payload.roleId,
    };
  }
}
