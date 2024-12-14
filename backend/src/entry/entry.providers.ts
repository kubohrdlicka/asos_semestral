import { DATA_SOURCE, ENTRY_REPOSITORY } from '../common/constants';
import { DataSource } from 'typeorm';
import { Entry } from './entities/entry.entity';

export const entryProviders = [
  {
    provide: ENTRY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Entry),
    inject: [DATA_SOURCE],
  },
];
