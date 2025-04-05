// src/pools/entities/pool.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Review } from "../../reviews/entities/review.entity";
  
  @Entity("pools")
  export class Pool {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    address: string;
  
    @Column("json", { nullable: true })
    metroStations: { name: string; coordinates: [number, number]; distance: string }[];
  
    @Column("json")
    coordinates: [number, number];
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    website: string;
  
    @Column({ nullable: true })
    workingHours: string;
  
    @Column("text")
    description: string;
  
    @Column("simple-array", { nullable: true })
    services: string[];
  
    @Column("simple-array")
    images: string[];
  
    @Column("json")
    priceRange: {
      individual: number;
      group?: number;
      trial?: number;
    };
  
    @Column("float", { default: 0 })
    rating: number;
  
    @OneToMany(() => Review, (review) => review.pool)
    reviews: Review[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }