import { ApiProperty } from '@nestjs/swagger';
import BaseDto from 'src/common/dto/base.dto';

export class GetTagDto extends BaseDto {
  @ApiProperty({
    description: 'Unique identifier of the tag',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the tag',
    example: 'Work',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the tag (optional)',
    example: 'Tasks related to work',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Color of the tag, in hex format',
    example: '#FF5733',
  })
  color: string;

  @ApiProperty({
    description: 'Icon name for the tag (optional)',
    example: 'work-outline',
    required: false,
  })
  iconName?: string;

  @ApiProperty({
    description: 'Number of entries associated with the tag',
    example: 5,
  })
  entryCount: number;
}
