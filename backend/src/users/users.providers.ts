import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { USERS_REPOSITORY } from 'src/common/constants';

export const usersProviders = [
  UsersService,
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
