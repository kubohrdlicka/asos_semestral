import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto);
  }

  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tagService.remove(+id);
  }
}
