import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubStrategy } from 'src/guards/strategies/github.strategy';
import { LocalStrategy } from 'src/guards/strategies/local.strategy';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule],
  providers: [AuthService, UsersService, GithubStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
