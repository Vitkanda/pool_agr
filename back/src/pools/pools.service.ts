// import { Injectable, NotFoundException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { Pool } from "./entities/pool.entity";
// import { CreatePoolDto } from "./dto/create-pool.dto";
// import { UpdatePoolDto } from "./dto/update-pool.dto";

// @Injectable()
// export class PoolsService {
//   constructor(
//     @InjectRepository(Pool)
//     private poolsRepository: Repository<Pool>
//   ) {}

//   async create(createPoolDto: CreatePoolDto): Promise<Pool> {
//     const newPool = this.poolsRepository.create(createPoolDto);
//     return this.poolsRepository.save(newPool);
//   }

//   async findAll(filters?: any): Promise<Pool[]> {
//     // Базовый запрос
//     let query = this.poolsRepository
//       .createQueryBuilder("pool")
//       .leftJoinAndSelect("pool.reviews", "review");

//     // Применяем фильтры, если они есть
//     if (filters) {
//       if (filters.district) {
//         query = query.andWhere("pool.address LIKE :district", {
//           district: `%${filters.district}%`,
//         });
//       }

//       if (filters.metro && filters.metro.length > 0) {
//         query = query.andWhere("pool.metroStations @> :metro", {
//           metro: JSON.stringify([{ name: filters.metro }]),
//         });
//       }

//       // Другие фильтры...
//     }

//     return query.getMany();
//   }

//   async findOne(id: string): Promise<Pool> {
//     const pool = await this.poolsRepository.findOne({
//       where: { id },
//       relations: ["reviews"],
//     });

//     if (!pool) {
//       throw new NotFoundException(`Бассейн с ID ${id} не найден`);
//     }

//     return pool;
//   }

//   async update(id: string, updatePoolDto: UpdatePoolDto): Promise<Pool> {
//     const pool = await this.findOne(id);
//     this.poolsRepository.merge(pool, updatePoolDto);
//     return this.poolsRepository.save(pool);
//   }

//   async remove(id: string): Promise<void> {
//     const result = await this.poolsRepository.delete(id);

//     if (result.affected === 0) {
//       throw new NotFoundException(`Бассейн с ID ${id} не найден`);
//     }
//   }

//   async updateRating(poolId: string): Promise<void> {
//     const pool = await this.findOne(poolId);

//     // Находим все отзывы для этого бассейна
//     const reviews = await this.poolsRepository
//       .createQueryBuilder("pool")
//       .leftJoinAndSelect("pool.reviews", "review")
//       .where("pool.id = :poolId", { poolId })
//       .getOne();

//     if (reviews && reviews.reviews.length > 0) {
//       // Вычисляем средний рейтинг
//       const totalRating = reviews.reviews.reduce(
//         (sum, review) => sum + review.rating,
//         0
//       );
//       const averageRating = totalRating / reviews.reviews.length;

//       // Обновляем рейтинг бассейна
//       pool.rating = parseFloat(averageRating.toFixed(1)); // Округляем до одного знака после запятой
//       await this.poolsRepository.save(pool);
//     } else {
//       // Если отзывов нет, устанавливаем рейтинг по умолчанию
//       pool.rating = 0;
//       await this.poolsRepository.save(pool);
//     }
//   }
// }


// back/src/pools/pools.service.ts
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
    const newPool = this.poolsRepository.create({
      name: createPoolDto.name,
      address: createPoolDto.address,
      coordinates: createPoolDto.coordinates,
      phone: createPoolDto.phone,
      website: createPoolDto.website,
      workingHours: createPoolDto.workingHours,
      description: createPoolDto.description,
      services: createPoolDto.services,
      images: createPoolDto.images,
      priceRange: createPoolDto.priceRange,
      metroStations: createPoolDto.metroStations,
    });
    
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
      
      // Добавим фильтр по возрастной группе (если он есть)
      if (filters.ageGroup) {
        query = query.andWhere("pool.services LIKE :ageGroup", {
          ageGroup: `%${filters.ageGroup}%`
        });
      }
    }
    
    const pools = await query.getMany();
    
    // Преобразуем данные в формат, ожидаемый фронтендом
    return pools.map(pool => this.transformToFrontendFormat(pool));
  }

  async findOne(id: string): Promise<Pool> {
    const pool = await this.poolsRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
    
    if (!pool) {
      throw new NotFoundException(`Бассейн с ID ${id} не найден`);
    }
    
    // Преобразуем данные в формат, ожидаемый фронтендом
    return this.transformToFrontendFormat(pool);
  }

  async update(id: string, updatePoolDto: UpdatePoolDto): Promise<Pool> {
    const pool = await this.poolsRepository.findOne({ where: { id } });
    
    if (!pool) {
      throw new NotFoundException(`Бассейн с ID ${id} не найден`);
    }
    
    // Обновляем поля
    if (updatePoolDto.name) pool.name = updatePoolDto.name;
    if (updatePoolDto.address) pool.address = updatePoolDto.address;
    if (updatePoolDto.coordinates) pool.coordinates = updatePoolDto.coordinates;
    if (updatePoolDto.phone) pool.phone = updatePoolDto.phone;
    if (updatePoolDto.website) pool.website = updatePoolDto.website;
    if (updatePoolDto.workingHours) pool.workingHours = updatePoolDto.workingHours;
    if (updatePoolDto.description) pool.description = updatePoolDto.description;
    if (updatePoolDto.services) pool.services = updatePoolDto.services;
    if (updatePoolDto.images) pool.images = updatePoolDto.images;
    if (updatePoolDto.priceRange) pool.priceRange = updatePoolDto.priceRange;
    if (updatePoolDto.metroStations) pool.metroStations = updatePoolDto.metroStations;
    
    const updatedPool = await this.poolsRepository.save(pool);
    return this.transformToFrontendFormat(updatedPool);
  }

  async remove(id: string): Promise<void> {
    const result = await this.poolsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Бассейн с ID ${id} не найден`);
    }
  }

  async updateRating(poolId: string): Promise<void> {
    const pool = await this.poolsRepository.findOne({
      where: { id: poolId },
      relations: ['reviews'],
    });
    
    if (!pool) {
      throw new NotFoundException(`Бассейн с ID ${poolId} не найден`);
    }
    
    if (pool.reviews && pool.reviews.length > 0) {
      // Вычисляем средний рейтинг
      const totalRating = pool.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / pool.reviews.length;
      
      // Обновляем рейтинг бассейна, округляя до одного знака после запятой
      pool.rating = parseFloat(averageRating.toFixed(1));
      await this.poolsRepository.save(pool);
    } else {
      // Если отзывов нет, устанавливаем рейтинг по умолчанию
      pool.rating = 0;
      await this.poolsRepository.save(pool);
    }
  }

  // Вспомогательный метод для преобразования данных в формат фронтенда
  private transformToFrontendFormat(pool: Pool): any {
    return {
      id: pool.id,
      name: pool.name,
      geometry: {
        coordinates: pool.coordinates,
      },
      properties: {
        CompanyMetaData: {
          name: pool.name,
          address: pool.address,
          Phones: pool.phone 
            ? [{ type: 'phone', formatted: pool.phone }] 
            : [],
          url: pool.website,
          Hours: pool.workingHours 
            ? { text: pool.workingHours } 
            : undefined,
          Categories: [{ name: 'Бассейн для детей' }],
          rating: pool.rating,
          reviews: pool.reviews 
            ? pool.reviews.map(review => ({
                author: review.author,
                comment: review.comment,
                rating: review.rating,
              })) 
            : [],
        },
        description: pool.description,
      },
      services: pool.services,
      images: pool.images,
      priceRange: pool.priceRange,
      metroStations: pool.metroStations,
      createdAt: pool.createdAt,
      updatedAt: pool.updatedAt,
    };
  }
}