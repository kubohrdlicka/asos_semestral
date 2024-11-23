import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_GROUP_REPOSITORY } from '../common/constants';
import { UserGroup } from './entities/usergroup.entity';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';
import { UsersService } from '../users/users.service';
import { EntryService } from '../entry/entry.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UsergroupService {
  constructor(
    @Inject(USER_GROUP_REPOSITORY)
    private readonly userGroupRepository: Repository<UserGroup>,
    private readonly usersService: UsersService,
    private readonly entriesService: EntryService,
  ) {}

  async create(
    createUsergroupDto: CreateUsergroupDto,
    groupOwner: User,
  ): Promise<UserGroup> {
    const owner = await this.usersService.findOne(groupOwner.id);

    const newUserGroup = this.userGroupRepository.create({
      owner,
      members: [owner],
    });

    return await this.userGroupRepository.save(newUserGroup);
  }

  async findAll(): Promise<UserGroup[]> {
    return await this.userGroupRepository.find();
  }

  async findOne(id: number): Promise<UserGroup> {
    const userGroup = await this.userGroupRepository.findOne({ where: { id } });
    if (!userGroup) {
      throw new NotFoundException(`User group with ID ${id} not found`);
    }
    return userGroup;
  }

  async update(
    id: number,
    updateUsergroupDto: UpdateUsergroupDto,
  ): Promise<UserGroup> {
    const userGroup = await this.findOne(id);
    const updatedGroup = this.userGroupRepository.merge(
      userGroup,
      updateUsergroupDto,
    );
    return await this.userGroupRepository.save(updatedGroup);
  }

  async remove(id: number): Promise<void> {
    const userGroup = await this.findOne(id);
    await this.userGroupRepository.remove(userGroup);
  }

  async addMember(groupId: number, userId: number): Promise<UserGroup> {
    const userGroup = await this.findOne(groupId);
    const user = await this.usersService.findOneEntity(userId);

    if (userGroup.members.some((member) => member.id === userId)) {
      throw new ForbiddenException('User is already a member of this group');
    }

    userGroup.members.push(user);
    return await this.userGroupRepository.save(userGroup);
  }

  async removeMember(
    groupId: number,
    memberId: number,
    requestingUserId: number,
  ): Promise<UserGroup> {
    const userGroup = await this.findOne(groupId);

    const isOwner = userGroup.owner.id === requestingUserId;
    const isSelf = requestingUserId === memberId;

    if (!isOwner && !isSelf) {
      throw new ForbiddenException(
        'You do not have permission to remove this member',
      );
    }

    if (isOwner && requestingUserId === memberId) {
      throw new ForbiddenException('Owner cannot remove themselves');
    }

    userGroup.members = userGroup.members.filter(
      (member) => member.id !== memberId,
    );

    return await this.userGroupRepository.save(userGroup);
  }

  async addEntry(groupId: number, entryId: number): Promise<UserGroup> {
    const userGroup = await this.findOne(groupId);
    const entry = await this.entriesService.findOne(entryId);

    if (userGroup.entries.some((e) => e.id === entryId)) {
      throw new ForbiddenException('Entry is already in the group');
    }

    userGroup.entries.push(entry);
    return await this.userGroupRepository.save(userGroup);
  }

  async removeEntry(groupId: number, entryId: number): Promise<UserGroup> {
    const userGroup = await this.findOne(groupId);

    userGroup.entries = userGroup.entries.filter(
      (entry) => entry.id !== entryId,
    );

    return await this.userGroupRepository.save(userGroup);
  }
}
