import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { LoggedInUser } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<GetUserDto[]> {
    return await this.usersService.findAll();
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: GetUserDto; access_token: string }> {
    const result = await this.usersService.create(createUserDto);

    return {
      user: result.user,
      access_token: result.access_token,
    };
  }

  @Patch()
  async updateUser(
    @LoggedInUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return this.usersService.update(user, updateUserDto);
  }

  @Get('/stats')
  async getStats(@LoggedInUser() user: User): Promise<any> {
    return this.usersService.getUserStats(user);
  }
}
