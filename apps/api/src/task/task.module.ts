import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AdminOrTaskOwnerGuard } from './guard/adminOrTaskOwner.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService, AdminOrTaskOwnerGuard],
})
export class TaskModule {}
