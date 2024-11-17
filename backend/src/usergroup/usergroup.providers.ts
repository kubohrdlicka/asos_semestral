import { DATA_SOURCE, USER_GROUP_REPOSITORY } from 'src/common/constants';
import { UserGroup } from './entities/usergroup.entity';
import { DataSource } from 'typeorm';

export const userGroupProviders = [
  {
    provide: USER_GROUP_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserGroup),
    inject: [DATA_SOURCE],
  },
];
