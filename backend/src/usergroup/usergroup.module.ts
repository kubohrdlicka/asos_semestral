import { Module } from '@nestjs/common';
import { UsergroupService } from './usergroup.service';
import { UsergroupController } from './usergroup.controller';
import { userGroupProviders } from './usergroup.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsergroupController],
  providers: [UsergroupService, ...userGroupProviders],
})
export class UsergroupModule {}