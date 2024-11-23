import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { UsersService } from 'src/users/users.service';
import { TagService } from 'src/tag/tag.service';
import { ENTRY_REPOSITORY } from 'src/common/constants';
import { Priority, Status } from './dto/create-entry.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EntryService {
  constructor(
    @Inject(ENTRY_REPOSITORY)
    private readonly entryRepository: Repository<Entry>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(TagService)
    private readonly tagsService: TagService,
  ) {}

  async create(createEntryDto: CreateEntryDto, user: User): Promise<Entry> {
    const { tagId, priority, status, ...rest } = createEntryDto;

    // Použitie findOneEntity na získanie celej entity User
    const owner = await this.usersService.findOneEntity(user.id);
    if (!owner) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }

    // Validate tag (optional)
    const tag = tagId ? await this.tagsService.findOne(tagId) : null;

    // Validate priority and status
    if (!Object.values(Priority).includes(priority)) {
      throw new NotFoundException(`Invalid priority value: ${priority}`);
    }

    if (!Object.values(Status).includes(status)) {
      throw new NotFoundException(`Invalid status value: ${status}`);
    }

    const entry = this.entryRepository.create({
      ...rest,
      priority,
      status,
    });

    // Assign relations manually
    entry.owner = owner;
    entry.tag = tag;

    // Uloženie objektu
    return this.entryRepository.save(entry);
  }

  // async findAll(user: User): Promise<Entry[]> {
  // return this.entryRepository.find({
  //   where: { owner: user },
  //   relations: ['owner', 'tag', 'userGroup'],
  // });
  // }
  async findAll(user: User): Promise<Entry[]> {
    return this.entryRepository
      .createQueryBuilder('entry')
      .leftJoinAndSelect('entry.owner', 'owner')
      .leftJoinAndSelect('entry.tag', 'tag')
      .leftJoinAndSelect('entry.userGroup', 'userGroup')
      .leftJoinAndSelect('userGroup.members', 'members')
      .where('entry.owner.id = :userId', { userId: user.id }) // Entries, ktoré vlastní používateľ
      .orWhere('members.id = :userId', { userId: user.id }) // Entries v skupinách, kde je členom
      .getMany();
  }

  async findOne(id: number): Promise<Entry> {
    const entry = await this.entryRepository.findOne({
      where: { id },
      relations: ['owner', 'tag'],
    });
    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }
    return entry;
  }

  async update(
    id: number,
    updateEntryDto: UpdateEntryDto,
    user: User,
  ): Promise<Entry> {
    const entry = await this.findOne(id);

    if (user.id) {
      const owner = await this.usersService.findOneEntity(user.id);
      if (!owner) {
        throw new NotFoundException(`User with ID ${user.id} not found`);
      }
      entry.owner = owner;
    }

    if (updateEntryDto.tagId) {
      const tag = await this.tagsService.findOne(updateEntryDto.tagId);
      if (!tag) {
        throw new NotFoundException(
          `Tag with ID ${updateEntryDto.tagId} not found`,
        );
      }
      entry.tag = tag;
    }

    if (updateEntryDto.priority) {
      if (!Object.values(Priority).includes(updateEntryDto.priority)) {
        throw new NotFoundException(
          `Invalid priority value: ${updateEntryDto.priority}`,
        );
      }
      entry.priority = updateEntryDto.priority;
    }

    if (updateEntryDto.status) {
      if (!Object.values(Status).includes(updateEntryDto.status)) {
        throw new NotFoundException(
          `Invalid status value: ${updateEntryDto.status}`,
        );
      }
      entry.status = updateEntryDto.status;
    }

    Object.assign(entry, updateEntryDto);
    return this.entryRepository.save(entry);
  }

  async remove(id: number): Promise<void> {
    const entry = await this.findOne(id);
    await this.entryRepository.remove(entry);
  }

  async assignToTag(entryId: number, tagId: number): Promise<Entry> {
    const entry = await this.findOne(entryId);
    const tag = await this.tagsService.findOne(tagId);
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    entry.tag = tag;
    return this.entryRepository.save(entry);
  }
}
