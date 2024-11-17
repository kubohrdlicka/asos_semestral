import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { entryProviders } from './entry.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EntryController],
  providers: [EntryService, ...entryProviders],
})
export class EntryModule {}
