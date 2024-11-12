import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  async findAll(): Promise<GetUserDto[]> {
    return await this.usersService.findAll();
  }

  @Public() //do it public for now, TODO: remove this decorator
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    const a = await this.usersService.create(createUserDto);

    return a;
  }
}
