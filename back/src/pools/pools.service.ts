import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pool } from './entities/pool.entity';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';

@Injectable()
export class PoolsService {
  constructor(
    @InjectRepository(Pool)
    private poolsRepository: Repository<Pool>,
  ) {}

  async create(createPoolDto: CreatePoolDto): Promise<Pool> {
    const newPool = this.poolsRepository.create(createPoolDto);
    return this.poolsRepository.save(newPool);
  }

  async findAll(filters?: any): Promise<Pool[]> {
    // Базовый запрос
    let query = this.poolsRepository.createQueryBuilder('pool')
      .leftJoinAndSelect('pool.reviews', 'review');
    
    // Применяем фильтры, если они есть
    if (filters) {
      if (filters.district) {
        query = query.andWhere('pool.address LIKE :district', { district: `%${filters.district}%` });
      }
      
      if (filters.metro && filters.metro.length > 0) {
        query = query.andWhere("pool.metroStations @> :metro", {
          metro: JSON.stringify([{ name: filters.metro }])
        });
      }
      
      // Другие фильтры...
    }
    
    return query.getMany();
  }

  async findOne(id: string): Promise<Pool> {
    const pool = await this.poolsRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
    
    if (!pool) {
      throw new NotFoundException(`Бассейн с ID ${id} не найден`);
    }
    
    return pool;
  }

  async update(id: string, updatePoolDto: UpdatePoolDto): Promise<Pool> {
    const pool = await this.findOne(id);
    this.poolsRepository.merge(pool, updatePoolDto);
    return this.poolsRepository.save(pool);
  }

  async remove(id: string): Promise<void> {
    const result = await this.poolsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Бассейн с ID ${id} не найден`);
    }
  }

  async updateRating(poolId: string): Promise<void> {
    // Обновление рейтинга на основе всех отзывов
    // ...
  }
}