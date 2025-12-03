import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

import { Role } from '@prisma/client';

@Injectable()
export class AdminOrTaskOwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (user.role === Role.ADMIN) {
      return true;
    }

    const taskId = request.params['id'];
    if (!taskId) {
      throw new NotFoundException('Task id param is required');
    }
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: { userId: true },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (user.id !== task?.userId) {
      throw new ForbiddenException(
        'User not authorized to access this resource',
      );
    }
    return true;
  }
}
