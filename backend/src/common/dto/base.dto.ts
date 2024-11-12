import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class BaseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
