// src/reviews/reviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PoolsService } from '../pools/pools.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private poolsService: PoolsService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = this.reviewsRepository.create(createReviewDto);
    const savedReview = await this.reviewsRepository.save(newReview);
    
    // Обновляем рейтинг бассейна
    await this.poolsService.updateRating(createReviewDto.poolId);
    
    return savedReview;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({
      relations: ['user', 'pool'],
    });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'pool'],
    });
    
    if (!review) {
      throw new NotFoundException(`Отзыв с ID ${id} не найден`);
    }
    
    return review;
  }

  async findByPool(poolId: string): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { pool: { id: poolId } },
      relations: ['user'],
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    this.reviewsRepository.merge(review, updateReviewDto);
    const updatedReview = await this.reviewsRepository.save(review);
    
    // Обновляем рейтинг бассейна
    await this.poolsService.updateRating(review.pool.id);
    
    return updatedReview;
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    const poolId = review.pool.id;
    
    const result = await this.reviewsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Отзыв с ID ${id} не найден`);
    }
    
    // Обновляем рейтинг бассейна
    await this.poolsService.updateRating(poolId);
  }
}