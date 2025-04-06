// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'secretKey'),
    });
  }

  async validate(payload: any) {
    // Получаем пользователя из базы данных для добавления всех его данных в запрос
    const user = await this.usersService.findOne(payload.sub);
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      ...user
    };
  }
}