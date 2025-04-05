import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { PoolsModule } from "./pools/pools.module";
import { AuthModule } from "./auth/auth.module";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "postgres"),
        database: configService.get("DB_DATABASE", "pool_aggregator"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get("NODE_ENV") !== "production",
      }),
    }),
    UsersModule,
    PoolsModule,
    AuthModule,
    ReviewsModule,
  ],
})
export class AppModule {}
