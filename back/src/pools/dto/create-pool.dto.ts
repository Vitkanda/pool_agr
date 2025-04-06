

// back/src/pools/dto/create-pool.dto.ts
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsOptional,
    ValidateNested,
    IsObject,
  } from "class-validator";
  import { Type } from "class-transformer";
  
  export class MetroStationDto {
    @IsString()
    name: string;
  
    @IsArray()
    coordinates: [number, number];
  
    @IsString()
    distance: string;
  }
  
  export class PriceRangeDto {
    @IsNumber()
    individual: number;
  
    @IsOptional()
    @IsNumber()
    group?: number;
  
    @IsOptional()
    @IsNumber()
    trial?: number;
  }
  
  export class CreatePoolDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MetroStationDto)
    metroStations?: MetroStationDto[];
  
    @IsArray()
    @IsNotEmpty()
    coordinates: [number, number];
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsOptional()
    @IsString()
    website?: string;
  
    @IsOptional()
    @IsString()
    workingHours?: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    services?: string[];
  
    @IsArray()
    @IsString({ each: true })
    images: string[];
  
    @IsObject()
    @ValidateNested()
    @Type(() => PriceRangeDto)
    priceRange: PriceRangeDto;
  }