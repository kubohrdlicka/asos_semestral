import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHelloworldDto {
  @ApiProperty({ description: 'Name description' })
  @IsString({ message: 'Name must be a string' })
  name: string;
}
