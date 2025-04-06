// src/reviews/dto/create-review.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min, Max, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  poolId: string;
}