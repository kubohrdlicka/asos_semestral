import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoggedInDto } from './dto/logged-in.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('user', user);

    if (!user) {
      return null;
    }
    console.log('verify', user.password, pass);

    const isPasswordMatching = await argon2.verify(user.password, pass);

    console.log('isPasswordMatching', isPasswordMatching);
    if (isPasswordMatching) {
      const { /*password, */ ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<LoggedInDto> {
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    const getUser = await this.usersService.findOne(user.id);
    return {
      access_token: token,
      user: getUser,
    };
  }
}
