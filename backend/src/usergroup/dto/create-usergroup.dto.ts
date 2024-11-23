import { IsString, IsOptional, IsHexColor } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsergroupDto {
  @ApiProperty({ description: 'Name of the user group', example: 'Developers' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the user group (optional)',
    example: 'A group for all developers in the team',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Color of the user group in hex format',
    example: '#3498DB',
  })
  @IsHexColor()
  color: string;

  @ApiProperty({
    description: 'Icon name for the user group (optional)',
    example: 'group-icon',
    required: false,
  })
  @IsOptional()
  @IsString()
  iconName?: string;
}
