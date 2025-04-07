// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET", "secretKey"),
    });
  }

  async validate(payload: any) {
    try {
      // Базовые данные пользователя из токена
      const userData = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      // Получаем пользователя из базы данных для добавления всех его данных
      const user = await this.usersService.findOne(payload.sub, false);
      userData["name"] = user.name;

      // Для менеджеров загружаем управляемые бассейны
      if (payload.role === "manager") {
        const userWithPools = await this.usersService.findOne(
          payload.sub,
          true
        );
        userData["managedPools"] = userWithPools.managedPools || [];
      }

      return userData;
    } catch (error) {
      // В случае ошибки возвращаем базовые данные из токена
      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
    }
  }
}
