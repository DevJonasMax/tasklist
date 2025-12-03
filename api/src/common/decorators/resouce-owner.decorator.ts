import { SetMetadata } from '@nestjs/common';

export const ResourceOwner = (params: string) =>
  SetMetadata('resourceOwner', params);
