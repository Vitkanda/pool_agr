// src/pools/pools.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { Pool } from './entities/pool.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pool])],
  controllers: [PoolsController],
  providers: [PoolsService],
  exports: [PoolsService],
})
export class PoolsModule {}