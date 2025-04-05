import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Проверка, что пользователь с таким email не существует
    const existingUser = await this.usersRepository.findOne({ 
      where: { email: createUserDto.email }
    });
    
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
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
      relations: ['managedPools'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['managedPools'],
    });
    
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    
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

  async assignPoolToUser(userId: string, poolId: string): Promise<User> {
    // Реализация присвоения бассейна пользователю-менеджеру
    // ...
    return null;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
  }
}