import { Test, TestingModule } from '@nestjs/testing';
import { UsergroupService } from './usergroup.service';

describe('UsergroupService', () => {
  let service: UsergroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsergroupService],
    }).compile();

    service = module.get<UsergroupService>(UsergroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
