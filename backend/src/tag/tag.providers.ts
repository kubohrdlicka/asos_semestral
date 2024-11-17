import { DATA_SOURCE, TAG_REPOSITORY } from 'src/common/constants';
import { DataSource } from 'typeorm';
import { Tag } from './entities/tag.entity';

export const tagProviders = [
  {
    provide: TAG_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: [DATA_SOURCE],
  },
];
