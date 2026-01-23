import {
  CanActivate,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class AdminOrDonationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (user.role === Role.ADMIN) {
      return true;
    }

    const resourceOwner = this.reflector.get<string>(
      'resourceOwner',
      context.getHandler(),
    );

    const ownerParam = resourceOwner || 'id';
    const resourceOwnerId = request.params[ownerParam];

    if (user.id === resourceOwnerId) {
      return true;
    }
    throw new ForbiddenException('User not authorized to access this resource');
  }
}
