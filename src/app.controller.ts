import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { GithubAuthGuard } from './guards/github.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(GithubAuthGuard)
  // @Get('/login')
  // async login(req: any) {
  //   console.log(123);
  //   const loginUser = await this.authService.validateUser();
  //   console.log('req.user : ', req.user);
  //   console.log('here');
  //   return loginUser;
  // }
}
