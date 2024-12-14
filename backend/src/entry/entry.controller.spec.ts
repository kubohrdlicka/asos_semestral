import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { UsersService } from '../users/users.service';
import { TagService } from '../tag/tag.service';

describe('EntryController', () => {
  let controller: EntryController;

  beforeEach(async () => {
    const mockEntryRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 1, title: 'Test Entry' }),
    };

    const mockUsersService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' }),
    };

    const mockTagService = {
      findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test Tag' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [
        EntryService,
        {
          provide: 'ENTRY_REPOSITORY',
          useValue: mockEntryRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    controller = module.get<EntryController>(EntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
