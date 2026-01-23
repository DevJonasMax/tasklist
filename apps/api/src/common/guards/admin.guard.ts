import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

import { Role } from '@prisma/client';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException(
        'User not logged in, please log in to access this resource',
      );
    }

    if (user.role === Role.ADMIN) {
      return true;
    }

    throw new ForbiddenException('User not authorized to access this resource');
  }
}
