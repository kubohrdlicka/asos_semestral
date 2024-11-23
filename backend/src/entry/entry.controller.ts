import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entryService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.entryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entryService.update(id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.entryService.remove(id);
  }

  @Post(':id/users')
  addUsers(@Param('id') id: number, @Body('userIds') userIds: number[]) {
    return this.entryService.addUsers(id, userIds);
  }

  @Post(':id/tag/:tagId')
  assignToTag(@Param('id') id: number, @Param('tagId') tagId: number) {
    return this.entryService.assignToTag(id, tagId);
  }
}
