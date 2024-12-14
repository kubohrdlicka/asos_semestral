import { Test, TestingModule } from '@nestjs/testing';
import { UsergroupController } from './usergroup.controller';
import { UsergroupService } from './usergroup.service';
import { UsersService } from '../users/users.service';
import { EntryService } from '../entry/entry.service';

describe('UsergroupController', () => {
  let controller: UsergroupController;

  beforeEach(async () => {
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
      controllers: [UsergroupController],
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

    controller = module.get<UsergroupController>(UsergroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
