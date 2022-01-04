import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { LogInUserDto } from './dto/login-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from 'src/decorators/userId.decorator';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // NOTE : 유저 회원가입
  @ApiOperation({ summary: '회원가입' })
  @Post('join')
  async join(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  // NOTE : 유저 로그인
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: LogInUserDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiBody({
    type: LogInUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@User() user: LogInUserDto) {
    return await this.authService.login(user);
  }

  // NOTE : 여기는 유저 브랜치입니다.
  // NOTE : 단일 유저 조회
  // NOTE : 유저의 패스워드를 제외한 모든 정보가 필요
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  async findOne(@UserId() userId) {
    return await this.usersService.findOne(userId);
  }
}
