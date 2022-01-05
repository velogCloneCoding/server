import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/user.entity';

export class LogInUserDto extends PickType(Users, [
  'email',
  'password',
] as const) {}
