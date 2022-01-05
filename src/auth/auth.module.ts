import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubStrategy } from 'src/guards/strategies/github.strategy';
import { JwtStrategy } from 'src/guards/strategies/jwt.strategy';
import { LocalStrategy } from 'src/guards/strategies/local.strategy';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/res/users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    GithubStrategy,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
