import { TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { createTestingModuleWithMocks } from '../../test/test-utils';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModuleWithMocks([
      UsersService,
    ]);

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
