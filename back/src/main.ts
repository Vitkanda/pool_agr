// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   // Включаем CORS для фронтенда
//   app.enableCors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     credentials: true,
//   });
  
//   // Добавляем глобальные пайпы и фильтры
//   app.useGlobalPipes(new ValidationPipe({ transform: true }));
//   app.useGlobalFilters(new HttpExceptionFilter());
  
//   // Глобальный префикс API
//   app.setGlobalPrefix('api');
  
//   await app.listen(process.env.PORT || 4000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включаем CORS для фронтенда
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  
  // Глобальные пайпы и фильтры
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // Префикс API
  app.setGlobalPrefix('api');

  const server = await app.listen(process.env.PORT || 4000);
  const url = await app.getUrl();

  console.log(`Application is running on: ${url}`);

  // 💥 Выводим список всех зарегистрированных маршрутов
  const router = app.getHttpAdapter().getInstance()._router;
  console.log('--- Registered routes ---');
  router.stack
    .filter(r => r.route)
    .forEach(r => {
      const route = r.route;
      const method = Object.keys(route.methods).join(', ').toUpperCase();
      console.log(`${method} ${route.path}`);
    });
}
bootstrap();
