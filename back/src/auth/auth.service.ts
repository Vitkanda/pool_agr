import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      // Загрузка пользователя без отношений сначала
      const user = await this.usersService.findByEmail(email, false);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // Если пользователь менеджер, загружаем связанные бассейны
        let userWithRelations = { ...user };

        if (user.role === "manager") {
          const userWithPools = await this.usersService.findByEmail(
            email,
            true
          );
          userWithRelations.managedPools = userWithPools.managedPools || [];
        }

        const { password, ...result } = userWithRelations;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    // Создаем payload для JWT токена
    const payload = { email: user.email, sub: user.id, role: user.role };

    // Если пользователь менеджер, загружаем его бассейны, если они еще не загружены
    let userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    if (user.role === "manager") {
      if (user.managedPools) {
        userData["managedPools"] = user.managedPools;
      } else {
        // Если бассейны не были загружены ранее, загружаем их сейчас
        const userWithPools = await this.usersService.findOne(user.id, true);
        userData["managedPools"] = userWithPools.managedPools || [];
      }
    }

    return {
      user: userData,
      access_token: this.jwtService.sign(payload),
    };
  }
}
