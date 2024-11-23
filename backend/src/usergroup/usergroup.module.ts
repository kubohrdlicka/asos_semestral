import { Module } from '@nestjs/common';
import { UsergroupService } from './usergroup.service';
import { UsergroupController } from './usergroup.controller';
import { userGroupProviders } from './usergroup.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { EntryModule } from '../entry/entry.module';

@Module({
  imports: [DatabaseModule, UsersModule, EntryModule],
  controllers: [UsergroupController],
  providers: [UsergroupService, ...userGroupProviders],
})
export class UsergroupModule {}
