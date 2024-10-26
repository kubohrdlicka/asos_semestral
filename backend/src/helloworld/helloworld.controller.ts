import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HelloworldService } from './helloworld.service';
import { CreateHelloworldDto } from './dto/create-helloworld.dto';
import { UpdateHelloworldDto } from './dto/update-helloworld.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('helloworld')
@Controller('helloworld')
export class HelloworldController {
  constructor(private readonly helloworldService: HelloworldService) {}

  @Post()
  create(@Body() createHelloworldDto: CreateHelloworldDto) {
    return this.helloworldService.create(createHelloworldDto);
  }

  @Get()
  findAll() {
    return this.helloworldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helloworldService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHelloworldDto: UpdateHelloworldDto,
  ) {
    return this.helloworldService.update(+id, updateHelloworldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helloworldService.remove(+id);
  }
}
