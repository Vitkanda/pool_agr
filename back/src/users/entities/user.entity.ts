import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Pool } from "../../pools/entities/pool.entity";
import { Review } from "../../reviews/entities/review.entity";

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToMany(() => Pool)
  @JoinTable({
    name: "user_pools",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "pool_id", referencedColumnName: "id" },
  })
  managedPools: Pool[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
