import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ENTRY_REPOSITORY, TAG_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Entry } from 'src/entry/entities/entry.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject(TAG_REPOSITORY) private readonly tagRepository: Repository<Tag>,
    @Inject(ENTRY_REPOSITORY)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(newTag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id); // Ensure the tag exists
    const updatedTag = this.tagRepository.merge(tag, updateTagDto);
    return await this.tagRepository.save(updatedTag);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['entries'],
    });
    if (!tag) {
      throw new Error(`Tag with id ${id} not found`);
    }

    const entries = tag.entries;
    for (const entry of tag.entries) {
      entry.tag = null;
      await this.entryRepository.save(entry);
    }

    await this.tagRepository.remove(tag);
  }
}
