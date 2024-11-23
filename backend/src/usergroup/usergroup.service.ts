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

  // Vytvorenie skupiny
  async create(
    createUsergroupDto: CreateUsergroupDto,
    user: User,
  ): Promise<UserGroup> {
    const owner = await this.usersService.findOneEntity(user.id);

    const newUserGroup = this.userGroupRepository.create({
      ...createUsergroupDto,
      owner,
      members: [owner],
    });

    return await this.userGroupRepository.save(newUserGroup);
  }

  async findAll(user: User): Promise<UserGroup[]> {
    return await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .leftJoinAndSelect('userGroup.owner', 'owner')
      .leftJoinAndSelect('userGroup.members', 'members')
      .leftJoinAndSelect('userGroup.entries', 'entries')
      .where('members.id = :userId', { userId: user.id })
      .getMany();
  }

  // Získanie konkrétnej skupiny
  async findOne(id: number): Promise<UserGroup> {
    const userGroup = await this.userGroupRepository.findOne({
      where: { id },
      relations: ['owner', 'members', 'entries'],
    });
    if (!userGroup) {
      throw new NotFoundException(`User group with ID ${id} not found`);
    }
    return userGroup;
  }

  // Úprava atribútov skupiny
  async update(
    id: number,
    updateUsergroupDto: UpdateUsergroupDto,
    user: User,
  ): Promise<UserGroup> {
    const userGroup = await this.findOne(id);

    // Iba vlastník skupiny môže upravovať skupinu
    if (userGroup.owner.id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this group',
      );
    }

    Object.assign(userGroup, updateUsergroupDto);

    return await this.userGroupRepository.save(userGroup);
  }

  // Vymazanie skupiny
  async remove(id: number, user: User): Promise<void> {
    const userGroup = await this.findOne(id);

    // Iba vlastník skupiny môže skupinu vymazať
    if (userGroup.owner.id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to delete this group',
      );
    }

    await this.userGroupRepository.remove(userGroup);
  }

  async addMemberByInviteCode(
    inviteCode: string,
    user: User,
  ): Promise<UserGroup> {
    const userGroup = await this.userGroupRepository.findOne({
      where: { inviteCode },
      relations: ['members'],
    });

    if (!userGroup) {
      throw new NotFoundException(
        `Group with invite code ${inviteCode} not found`,
      );
    }

    const foundUser = await this.usersService.findOneEntity(user.id);

    if (userGroup.members.some((member) => member.id === user.id)) {
      throw new ForbiddenException('User is already a member of this group');
    }

    userGroup.members.push(foundUser);
    return await this.userGroupRepository.save(userGroup);
  }

  // Vymazanie člena zo skupiny
  async removeMember(
    groupId: number,
    memberId: number,
    user: User,
  ): Promise<UserGroup> {
    const userGroup = await this.findOne(groupId);

    const isOwner = userGroup.owner.id === user.id;

    if (!userGroup.members.some((member) => member.id === memberId)) {
      throw new NotFoundException('Member not found in group');
    }

    if (!isOwner) {
      throw new ForbiddenException(
        'You do not have permission to remove this member',
      );
    }

    // Vlastník nemôže vymazať sám seba
    if (isOwner && user.id === memberId) {
      throw new ForbiddenException('Owner cannot remove themselves');
    }

    userGroup.members = userGroup.members.filter(
      (member) => member.id !== memberId,
    );

    return await this.userGroupRepository.save(userGroup);
  }

  // Pridanie Entry do skupiny
  async addEntry(groupId: number, entryId: number): Promise<UserGroup> {
    const userGroup = await this.findOne(groupId);
    const entry = await this.entriesService.findOne(entryId);

    if (userGroup.entries.some((e) => e.id === entryId)) {
      throw new ForbiddenException('Entry is already in the group');
    }

    userGroup.entries.push(entry);
    return await this.userGroupRepository.save(userGroup);
  }

  // Vymazanie Entry zo skupiny
  async removeEntry(groupId: number, entryId: number): Promise<UserGroup> {
    const userGroup = await this.findOne(groupId);

    userGroup.entries = userGroup.entries.filter(
      (entry) => entry.id !== entryId,
    );

    return await this.userGroupRepository.save(userGroup);
  }

  async removeMeFromUsergroup(groupId: number, user: User): Promise<void> {
    const userGroup = await this.findOne(groupId);

    // Check if the user is a member of the group
    if (!userGroup.members.some((member) => member.id === user.id)) {
      throw new NotFoundException('You are not a member of this user group');
    }

    // Check if the user is the owner of the group
    if (userGroup.owner.id === user.id) {
      throw new ForbiddenException(
        'The owner of the group cannot remove themselves',
      );
    }

    // Remove the user from the group
    userGroup.members = userGroup.members.filter(
      (member) => member.id !== user.id,
    );

    await this.userGroupRepository.save(userGroup);
  }
}
