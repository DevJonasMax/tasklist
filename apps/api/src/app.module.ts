import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

// import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    TaskModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
