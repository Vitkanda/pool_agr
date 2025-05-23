// src/pools/pools.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';

@Controller('pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @Post()
  create(@Body() createPoolDto: CreatePoolDto) {
    return this.poolsService.create(createPoolDto);
  }

  @Get()
  findAll(@Query() filters: any) {
    return this.poolsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poolsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoolDto: UpdatePoolDto) {
    return this.poolsService.update(id, updatePoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poolsService.remove(id);
  }
}