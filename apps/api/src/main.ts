import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
      forbidUnknownValues: true,
    }),
  );
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app
    .listen(process.env.PORT ?? 3000)
    .then(() =>
      console.log(
        `Application is running on port: ${process.env.PORT ?? 3000}`,
      ),
    )
    .catch((err) => console.log('error connecting, error:', err));
}
void bootstrap();
