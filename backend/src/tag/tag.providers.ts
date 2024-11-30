import {
  DATA_SOURCE,
  ENTRY_REPOSITORY,
  TAG_REPOSITORY,
} from 'src/common/constants';
import { DataSource } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { Entry } from 'src/entry/entities/entry.entity';

export const tagProviders = [
  {
    provide: TAG_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: [DATA_SOURCE],
  },
  {
    provide: ENTRY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Entry),
    inject: [DATA_SOURCE],
  },
];
