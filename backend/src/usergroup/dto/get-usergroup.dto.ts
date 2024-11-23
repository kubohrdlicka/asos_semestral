import { ApiProperty } from '@nestjs/swagger';

import BaseDto from '../../common/dto/base.dto';
import { User } from '../../users/entities/user.entity';
import { Entry } from '../../entry/entities/entry.entity'; // Adjust the path to your Entry entity

export class GetUsergroupDto extends BaseDto {
  @ApiProperty({
    description: 'Name of the user group',
    example: 'Developers',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the user group (optional)',
    example: 'A group for all developers in the team',
  })
  description?: string;

  @ApiProperty({
    description: 'Color of the user group in hex format',
    example: '#3498DB',
  })
  color: string;

  @ApiProperty({
    description: 'Icon name for the user group (optional)',
    example: 'group-icon',
  })
  iconName?: string;

  @ApiProperty({
    description: 'Owner of the user group',
    type: () => User,
  })
  owner: User;

  @ApiProperty({
    description: 'List of members in the user group',
    type: () => [User],
  })
  members: User[];

  @ApiProperty({
    description: 'List of entries associated with the user group',
    type: () => [Entry],
  })
  entries: Entry[];

  @ApiProperty({
    description: 'Unique invite code for the user group',
    example: 'abc1234-uuid-code',
  })
  inviteCode: string;
}
