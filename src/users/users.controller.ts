import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // NOTE : 유저 회원가입
  @Post('join')
  join(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  // NOTE : 유저 로그인
  // @Post('login')
  // login(@Body() loginUserDto : LoginUserDto) {
  //   return this.usersService.login(loginUserDto);
  // }

  // NOTE : 여기는 유저 브랜치입니다.
  // NOTE : 단일 유저 조회
  // NOTE : 유저의 패스워드를 제외한 모든 정보가 필요
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
