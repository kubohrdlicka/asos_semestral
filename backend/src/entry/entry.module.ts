import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { entryProviders } from './entry.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [DatabaseModule, UsersModule, TagModule],
  controllers: [EntryController],
  providers: [EntryService, ...entryProviders],
  exports: [EntryService],
})
export class EntryModule {}
