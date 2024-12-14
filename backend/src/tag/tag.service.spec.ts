import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

describe('TagController', () => {
  let tagController: TagController;
  let tagService: TagService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    tagService = moduleRef.get<TagService>(TagService);
    tagController = moduleRef.get<TagController>(TagController);
  });

  describe('create', () => {
    it('should create a tag', async () => {
      const createTagDto: CreateTagDto = {
        name: 'Test',
        color: '#FFFFFF',
        description: 'Test description',
        iconName: 'test-icon',
      };
      const result = { id: 1, ...createTagDto };
      jest.spyOn(tagService, 'create').mockResolvedValue(result as Tag);

      expect(await tagController.create(createTagDto)).toEqual(result);
      expect(tagService.create).toHaveBeenCalledWith(createTagDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const result = [
        {
          id: 1,
          name: 'Test',
          color: '#FFFFFF',
          description: 'Test description',
          iconName: 'test-icon',
        },
      ];
      jest.spyOn(tagService, 'findAll').mockResolvedValue(result as Tag[]);

      expect(await tagController.findAll()).toBe(result);
      expect(tagService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single tag', async () => {
      const id = 1;
      const result = {
        id,
        name: 'Test',
        color: '#FFFFFF',
        description: 'Test description',
        iconName: 'test-icon',
      };
      jest.spyOn(tagService, 'findOne').mockResolvedValue(result as Tag);

      expect(await tagController.findOne(String(id))).toEqual(result);
      expect(tagService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a tag', async () => {
      const id = 1;
      const updateTagDto: UpdateTagDto = {
        name: 'Updated Name',
        color: '#000000',
      };
      const result = { id, ...updateTagDto, description: null, iconName: null };
      jest.spyOn(tagService, 'update').mockResolvedValue(result as Tag);

      expect(await tagController.update(String(id), updateTagDto)).toEqual(
        result,
      );
      expect(tagService.update).toHaveBeenCalledWith(id, updateTagDto);
    });
  });

  describe('remove', () => {
    it('should remove a tag', async () => {
      const id = 1;
      const result = {
        id,
        name: 'Test',
        color: '#FFFFFF',
        description: 'Test description',
        iconName: 'test-icon',
      };
      jest.spyOn(tagService, 'remove').mockResolvedValue(undefined);

      expect(await tagController.remove(String(id))).toBeUndefined();
      expect(tagService.remove).toHaveBeenCalledWith(id);
    });
  });
});
