import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import BaseDto from '../../common/dto/base.dto';

export class CreateTagDto extends BaseDto {
  @ApiProperty({
    description: 'Name of the tag',
    example: 'Work',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the tag (optional)',
    example: 'Tasks related to work',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Color of the tag, in hex format',
    example: '#FF5733',
  })
  @IsString()
  color: string;

  @ApiProperty({
    description: 'Icon name for the tag (optional)',
    example: 'work-outline',
    required: false,
  })
  @IsOptional()
  @IsString()
  iconName?: string;
}
