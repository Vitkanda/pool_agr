// src/pools/dto/update-pool.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePoolDto } from './create-pool.dto';

export class UpdatePoolDto extends PartialType(CreatePoolDto) {}