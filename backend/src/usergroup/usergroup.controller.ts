import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsergroupService } from './usergroup.service';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';
import { User } from '../users/entities/user.entity';
import { LoggedInUser } from '../users/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('usergroup')
@ApiTags('Usergroup')
export class UsergroupController {
  constructor(private readonly usergroupService: UsergroupService) {}

  @Post()
  create(
    @Body() createUsergroupDto: CreateUsergroupDto,
    @LoggedInUser() user: User,
  ) {
    return this.usergroupService.create(createUsergroupDto, user);
  }

  @Get()
  findAll(@LoggedInUser() user: User) {
    return this.usergroupService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usergroupService.findOne(+id);
  }

  @Post(':invite_code')
  async addMemberByInviteCode(
    @Param('invite_code') inviteCode: string,
    @LoggedInUser() user: User,
  ) {
    return this.usergroupService.addMemberByInviteCode(inviteCode, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsergroupDto: UpdateUsergroupDto,
    @LoggedInUser() user: User,
  ) {
    return this.usergroupService.update(+id, updateUsergroupDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @LoggedInUser() user: User) {
    return this.usergroupService.remove(+id, user);
  }

  @Delete(':id/me')
  async removeMeFromUsergroup(
    @Param('id') id: string,
    @LoggedInUser() user: User,
  ) {
    return this.usergroupService.removeMeFromUsergroup(+id, user);
  }

  @Delete(':id/member/:memberId')
  async removeMember(
    @Param('id') groupId: string,
    @Param('memberId') memberId: string,
    @LoggedInUser() admin: User,
  ) {
    return this.usergroupService.removeMember(+groupId, +memberId, admin);
  }

  @Post(':id/entry/:entryId')
  async addEntryToUsergroup(
    @Param('id') groupId: string,
    @Param('entryId') entryId: string,
  ) {
    return this.usergroupService.addEntry(+groupId, +entryId);
  }

  @Delete(':id/entry/:entryId')
  async removeEntryFromUsergroup(
    @Param('id') groupId: string,
    @Param('entryId') entryId: string,
  ) {
    return this.usergroupService.removeEntry(+groupId, +entryId);
  }
}
