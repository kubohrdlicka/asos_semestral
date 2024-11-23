import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Public()
  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return await this.authService.login(req.user);
  // }

  // @Public()
  // @Post('auth/register')
  // async register(@Body() user: CreateUserDto) {
  //   return await this.usersService.create(user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('auth/me')
  // async getProfile(@LoggedInUser() loggedInUser: User) {
  //   return await this.usersService.findOne(loggedInUser.id);
  // }
}
