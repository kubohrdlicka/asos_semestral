import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/common/decorator/public.decorator';
import { LoggedInUser } from 'src/users/decorators/user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from '../entry/dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@LoggedInUser() loggedInUser: User) {
    return await this.usersService.findOne(loggedInUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reset-password')
  async resetPassword(
    @LoggedInUser() user: User,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<string> {
    const { oldPassword, newPassword, confirmPassword } = resetPasswordDto;
    return await this.authService.resetPassword(
      user,
      oldPassword,
      newPassword,
      confirmPassword,
    );
  }
}
