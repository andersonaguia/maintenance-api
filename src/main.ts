import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { useContainer } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
  Logger.log('Server is running on port 3000');
}
bootstrap();
