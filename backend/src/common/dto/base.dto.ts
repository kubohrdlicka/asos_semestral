import { ApiProperty } from '@nestjs/swagger';

export default class BaseDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
