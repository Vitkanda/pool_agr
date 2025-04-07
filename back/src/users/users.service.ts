import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";

import { Pool } from "../pools/entities/pool.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Проверка, что пользователь с таким email не существует
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException("Пользователь с таким email уже существует");
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Создание нового пользователя
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ["managedPools"],
    });
  }

  async findOne(id: string, withRelations: boolean = false): Promise<User> {
    const options: any = {
      where: { id },
    };

    if (withRelations) {
      options.relations = ["managedPools"];
    }

    const user = await this.usersRepository.findOne(options);

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }

    return user;
  }

  async findByEmail(
    email: string,
    withRelations: boolean = false
  ): Promise<User> {
    const options: any = {
      where: { email },
    };

    if (withRelations) {
      options.relations = ["managedPools"];
    }

    const user = await this.usersRepository.findOne(options);

    if (!user) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Если обновляется пароль, хэшируем его
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Обновляем пользователя
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async updateUserPools(userId: string, poolIds: string[]): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["managedPools"],
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    // Получаем репозиторий бассейнов
    const poolRepository = this.usersRepository.manager.getRepository(Pool);

    // Находим все бассейны по переданным ID
    const pools = await poolRepository.findBy({ id: In(poolIds) });

    // Обновляем связи
    user.managedPools = pools;

    return this.usersRepository.save(user);
  }

  async assignPoolToUser(userId: string, poolId: string): Promise<User> {
    // Находим пользователя с отношениями
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["managedPools"],
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }

    // Проверяем, что роль пользователя - менеджер или админ
    if (user.role !== UserRole.MANAGER && user.role !== UserRole.ADMIN) {
      throw new Error(
        "Только менеджеры и администраторы могут управлять бассейнами"
      );
    }

    // Проверяем, что бассейн существует
    const poolRepository = this.usersRepository.manager.getRepository(Pool);
    const pool = await poolRepository.findOne({ where: { id: poolId } });

    if (!pool) {
      throw new NotFoundException(`Бассейн с ID ${poolId} не найден`);
    }

    // Инициализируем массив, если его еще нет
    if (!user.managedPools) {
      user.managedPools = [];
    }

    // Проверяем, не присвоен ли уже этот бассейн пользователю
    const alreadyAssigned = user.managedPools.some((p) => p.id === poolId);

    if (!alreadyAssigned) {
      // Добавляем бассейн к списку управляемых пользователем
      user.managedPools.push(pool);
      await this.usersRepository.save(user);
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
  }
}
