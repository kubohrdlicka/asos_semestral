import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { mapUserToGetUserDto } from './mappers/user.mapper';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { USERS_REPOSITORY } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<GetUserDto[] | undefined> {
    const users: User[] = await this.userRepository.find();
    return users.map((user) => mapUserToGetUserDto(user));
  }

  async findOne(id: number): Promise<GetUserDto | undefined> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return mapUserToGetUserDto(user);
  }

  async findOneEntity(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User entity with ID ${id} not found`);
    }
    return user; // Vráti celú entitu User
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: email },
      select: ['password', 'email', 'id'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<GetUserDto | undefined> {
    try {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);
      delete savedUser.password;

      return mapUserToGetUserDto(savedUser);
    } catch (e) {
      console.log('e', e);
    }
  }
}
