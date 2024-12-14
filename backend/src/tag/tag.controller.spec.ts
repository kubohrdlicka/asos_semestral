import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

describe('TagController', () => {
  let controller: TagController;

  beforeEach(async () => {
    // Mock dependencies
    const mockTagRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Tag' }),
    };

    const mockEntryRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        TagService,
        {
          provide: 'TAG_REPOSITORY',
          useValue: mockTagRepository,
        },
        {
          provide: 'ENTRY_REPOSITORY',
          useValue: mockEntryRepository,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
