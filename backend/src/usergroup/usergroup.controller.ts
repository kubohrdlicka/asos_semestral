import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsergroupService } from './usergroup.service';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';

@Controller('usergroup')
export class UsergroupController {
  constructor(private readonly usergroupService: UsergroupService) {}

  @Post()
  create(@Body() createUsergroupDto: CreateUsergroupDto) {
    return this.usergroupService.create(createUsergroupDto);
  }

  @Get()
  findAll() {
    return this.usergroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usergroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsergroupDto: UpdateUsergroupDto) {
    return this.usergroupService.update(+id, updateUsergroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usergroupService.remove(+id);
  }
}
