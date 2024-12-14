import { Test, TestingModule } from '@nestjs/testing';
import { UsergroupService } from './usergroup.service';
import { UsersService } from '../users/users.service';
import { EntryService } from '../entry/entry.service';

describe('UsergroupService', () => {
  let service: UsergroupService;

  beforeEach(async () => {
    // Mock dependencies
    const mockUsergroupRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Group' }),
    };

    const mockUsersService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' }),
    };

    const mockEntryService = {
      findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Entry' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsergroupService,
        {
          provide: 'USER_GROUP_REPOSITORY',
          useValue: mockUsergroupRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: EntryService,
          useValue: mockEntryService,
        },
      ],
    }).compile();

    service = module.get<UsergroupService>(UsergroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
