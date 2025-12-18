import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';

export interface RequestWithUser {
  id: string;
  email: string;
  role: Role;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestWithUser => {
    const request = ctx.switchToHttp().getRequest<{ user?: RequestWithUser }>();
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return request.user;
  },
);
