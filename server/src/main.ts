/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(process.env.PORT ?? 3005);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
