import { PickType } from '@nestjs/mapped-types';
import { Users } from '../entities/user.entity';

export class LogInUserDto extends PickType(Users, [
  'email',
  'password',
] as const) {}
