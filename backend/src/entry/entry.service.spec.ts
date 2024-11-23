import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from './entry.service';
import { Repository } from 'typeorm';
import { Entry, Type } from './entities/entry.entity';
import { UsersService } from 'src/users/users.service';
import { TagService } from 'src/tag/tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateEntryDto, Priority, Status } from './dto/create-entry.dto';
import { User } from '../users/entities/user.entity';
import { Tag } from '../tag/entities/tag.entity';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AuthModule } from 'src/auth/auth.module';
import { EntryModule } from 'src/entry/entry.module';
import { HelloworldModule } from 'src/helloworld/helloworld.module';
import { UsersModule } from 'src/users/users.module';
import { TagModule } from 'src/tag/tag.module';
import { UsergroupModule } from 'src/usergroup/usergroup.module';
import { JwtModule } from '@nestjs/jwt';

describe('EntryService', () => {
  let service: EntryService;
  let entryRepository: Repository<Entry>;
  let usersService: UsersService;
  let tagsService: TagService;

  const mockOwner = { id: 1, name: 'Mock User' } as unknown as User; // Mockovaný používateľ
  const mockTag = {
    id: 1,
    name: 'Mock Tag',
    color: '#FFFFFF',
    entries: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Tag;

  const mockEntry = {
    id: 1,
    name: 'Test Entry',
    type: 'task',
    priority: Priority.HIGH,
    status: Status.DONE,
    owner: mockOwner, // Mockovaný používateľ
    tag: mockTag, // Mockovaný tag
    createdAt: new Date(),
    updatedAt: new Date(), // Povinná vlastnosť z BaseEntity
    updateTimestamp: jest.fn(), // Mockovaná funkcia pre @BeforeUpdate
  } as Entry;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HelloworldModule,
        UsersModule,
        EntryModule,
        TagModule,
        UsergroupModule,
        JwtModule,
        AuthModule,
      ],
      providers: [
        EntryService,
        {
          provide: getRepositoryToken(Entry),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOneEntity: jest.fn(),
          },
        },
        {
          provide: TagService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
    entryRepository = module.get<Repository<Entry>>(getRepositoryToken(Entry));
    usersService = module.get<UsersService>(UsersService);
    tagsService = module.get<TagService>(TagService);

    // Pred každým testom nastavíme mockovaného používateľa
    jest.spyOn(usersService, 'findOneEntity').mockResolvedValue(mockOwner);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new entry', async () => {
      const createEntryDto: CreateEntryDto = {
        name: 'Test Entry',
        type: Type.TASK,
        priority: Priority.MEDIUM,
        status: Status.TODO,
      };

      jest.spyOn(tagsService, 'findOne').mockResolvedValue(mockTag);
      jest.spyOn(entryRepository, 'create').mockReturnValue(mockEntry);
      jest.spyOn(entryRepository, 'save').mockResolvedValue(mockEntry);

      const result = await service.create(createEntryDto, mockOwner);

      expect(usersService.findOneEntity).toHaveBeenCalledWith(1); // Overí, že sa volá s ID používateľa
      expect(tagsService.findOne).not.toHaveBeenCalled(); // Tag je nepovinný, preto sa nevolá
      expect(entryRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Entry',
          type: 'task',
          priority: Priority.MEDIUM,
          status: Status.TODO,
        }),
      );
      expect(entryRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockEntry);
    });

    it('should throw an error if priority is invalid', async () => {
      const createEntryDto: CreateEntryDto = {
        name: 'Invalid Priority Entry',
        type: Type.TASK,
        priority: 'invalid' as Priority,
        status: Status.TODO,
      };

      await expect(service.create(createEntryDto, mockOwner)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all entries', async () => {
      const mockEntries = [mockEntry];
      jest.spyOn(entryRepository, 'find').mockResolvedValue(mockEntries);

      const result = await service.findAll();

      expect(entryRepository.find).toHaveBeenCalledWith({
        relations: ['owner', 'tag'],
      });
      expect(result).toEqual(mockEntries);
    });
  });

  describe('findOne', () => {
    it('should return an entry by id', async () => {
      jest.spyOn(entryRepository, 'findOne').mockResolvedValue(mockEntry);

      const result = await service.findOne(1);

      expect(entryRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['owner', 'tag'],
      });
      expect(result).toEqual(mockEntry);
    });

    it('should throw an error if entry is not found', async () => {
      jest.spyOn(entryRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an entry', async () => {
      const updateDto = { priority: Priority.HIGH } as Partial<UpdateEntryDto>;

      const updatedEntry = {
        ...mockEntry,
        priority: Priority.HIGH,
      };

      // Mockovanie metód
      jest.spyOn(service, 'findOne').mockResolvedValue(mockEntry); // Nájde existujúci záznam
      jest
        .spyOn(entryRepository, 'save')
        .mockResolvedValue(updatedEntry as Entry); // Uloží aktualizovaný záznam

      const result = await service.update(1, updateDto, mockOwner); // Volanie aktualizačnej metódy

      // Overenie, že findOne sa volá správne
      expect(service.findOne).toHaveBeenCalledWith(1);

      // Overenie, že entryRepository.save sa volá s aktualizovaným objektom
      expect(entryRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          priority: Priority.HIGH, // Skontrolujeme, že priorita bola aktualizovaná
        }),
      );

      // Overenie výsledku
      expect(result).toEqual(updatedEntry);
    });

    it('should throw an error if entry is not found', async () => {
      const updateDto = { priority: Priority.HIGH } as Partial<UpdateEntryDto>;

      jest.spyOn(service, 'findOne').mockResolvedValue(null); // Nájde sa null, čo znamená, že záznam neexistuje

      await expect(service.update(1, updateDto, mockOwner)).rejects.toThrow(
        NotFoundException,
      ); // Skontrolujeme, že sa vyvolá výnimka
    });
  });

  describe('remove', () => {
    it('should delete an entry by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockEntry);
      jest.spyOn(entryRepository, 'remove').mockResolvedValue(mockEntry);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(entryRepository.remove).toHaveBeenCalledWith(mockEntry);
    });
  });
});
