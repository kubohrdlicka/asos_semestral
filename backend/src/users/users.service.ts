import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mapUserToGetUserDto } from './mappers/user.mapper';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { USERS_REPOSITORY } from 'src/common/constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { Status } from '../entry/entities/entry.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: Repository<User>,

    // @Inject()
    // private entryService: EntryService,
    //
    // @Inject()
    // private userGroupService: UsergroupService,

    private jwtService: JwtService,
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

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string; user: GetUserDto }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    delete savedUser.password;

    return {
      access_token: token,
      user: mapUserToGetUserDto(savedUser),
    };
  }

  async update(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto | undefined> {
    // const user = await this.userRepository.findOne({ where: { id } });
    const id = user.id;

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }

    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;

    return mapUserToGetUserDto(updatedUser);
  }

  async updatePassword(user: User) {
    await this.userRepository.save(user);
  }

  async getUserStats(user: User): Promise<any> {
    const userWithEntries = await this.userRepository.findOne({
      where: { id: user.id },
      relations: {
        entries: true,
        memberOf: true,
      },
    });

    const totalTasksCreated = userWithEntries?.entries.length;
    const completedTasks = userWithEntries?.entries.filter(
      (entry) => entry.status === Status.DONE,
    ).length;

    const totalGroups = userWithEntries?.memberOf.length;

    return {
      totalTasksCreated,
      completedTasks,
      totalGroups,
    };
  }
}
