import { Module } from '@nestjs/common';
import { HelloworldService } from './helloworld.service';
import { HelloworldController } from './helloworld.controller';
import { helloworldProviders } from './helloworld.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HelloworldController],
  providers: [HelloworldService, ...helloworldProviders],
})
export class HelloworldModule {}
