import { DataSource } from 'typeorm';
import { Helloworld } from './entities/helloworld.entity';

export const helloworldProviders = [
  {
    provide: 'HELLOWORLD_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Helloworld),
    inject: ['DATA_SOURCE'],
  },
];
