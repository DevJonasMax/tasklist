import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './createTaskDto';
import { Status } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
// }
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsEnum(Status)
  readonly completed?: Status;
}
