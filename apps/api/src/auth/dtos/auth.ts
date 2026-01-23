import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dtos/createUserDto';

export class SignUpDto extends CreateUserDto {}

export class SignInDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
