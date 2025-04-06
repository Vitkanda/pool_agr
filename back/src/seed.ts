// back/src/seed.ts

import * as crypto from "crypto";
(global as any).crypto = crypto;

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pool } from "./pools/entities/pool.entity";
import { User } from "./users/entities/user.entity";
import { UserRole } from "./users/entities/user.entity";
import * as bcrypt from "bcryptjs";

import { allPools } from "./data/allPools";
// import { allPools } from 'src/data/allPools';

// Импорт данных из файла allPools.ts
// Этот файл нужно будет скопировать из front/src/lib/allPools.ts в back/src/data/allPools.ts
// Путь к данным
// Перед запуском скрипта создайте директорию back/src/data
// и скопируйте туда файл back/src/data/allPools.ts из артефакта all-pools-data
// import { allPools } from './data/allPools';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Получаем репозитории сущностей
    const poolRepository = app.get<Repository<Pool>>(getRepositoryToken(Pool));
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));

    // Очищаем существующие данные (опционально)
    console.log("Очистка базы данных...");
    await poolRepository.delete({});

    // Создаем админа если его нет
    const adminEmail = "admin@example.com";
    const existingAdmin = await userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      console.log("Создание администратора...");
      const adminPassword = await bcrypt.hash("admin123", 10);
      const admin = userRepository.create({
        name: "Администратор",
        email: adminEmail,
        password: adminPassword,
        role: UserRole.ADMIN,
      });
      await userRepository.save(admin);
    }

    // Создаем тестового пользователя
    const userEmail = "user@example.com";
    const existingUser = await userRepository.findOne({
      where: { email: userEmail },
    });

    if (!existingUser) {
      console.log("Создание тестового пользователя...");
      const userPassword = await bcrypt.hash("user123", 10);
      const user = userRepository.create({
        name: "Пользователь",
        email: userEmail,
        password: userPassword,
        role: UserRole.USER,
      });
      await userRepository.save(user);
    }

    // Импорт бассейнов
    console.log("Импорт бассейнов...");
    for (const poolData of allPools) {
      const pool = poolRepository.create({
        name: poolData.name,
        address: poolData.properties.CompanyMetaData.address,
        coordinates: poolData.geometry.coordinates,
        phone:
          poolData.properties.CompanyMetaData.Phones?.[0]?.formatted || null,
        website: poolData.properties.CompanyMetaData.url || null,
        workingHours: poolData.properties.CompanyMetaData.Hours?.text || null,
        description: poolData.properties.description,
        services: poolData.services || [],
        images: poolData.images,
        priceRange: poolData.priceRange,
        metroStations: poolData.metroStations || [],
        rating: poolData.properties.CompanyMetaData.rating,
      });

      await poolRepository.save(pool);
    }

    console.log(`Успешно импортировано ${allPools.length} бассейнов`);
  } catch (error) {
    console.error("Ошибка при импорте данных:", error);
  } finally {
    await app.close();
  }
}

bootstrap();
