import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorator/public.decorator';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LoggedInUser } from './users/decorators/user.decorator';
import { User } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/me')
  async getProfile(@LoggedInUser() loggedInUser: User) {
    return await this.usersService.findOne(loggedInUser.id);
  }
}
