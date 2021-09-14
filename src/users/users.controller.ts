import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  // NOTE : 유저 회원가입
  @Post('join')
  join(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  // NOTE : 유저 로그인
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  logIn(@Req() req) {
    //:LogInUserDto
    console.log(req.user);
    return this.authService.login(req.user);
    // return this.usersService.logIn(body.email, body.password);
  }

  // NOTE : 여기는 유저 브랜치입니다.
  // NOTE : 단일 유저 조회
  // NOTE : 유저의 패스워드를 제외한 모든 정보가 필요
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
