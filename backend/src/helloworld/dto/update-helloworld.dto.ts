import { PartialType } from '@nestjs/mapped-types';
import { CreateHelloworldDto } from './create-helloworld.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHelloworldDto extends PartialType(CreateHelloworldDto) {
  @ApiProperty()
  name: string;
}
