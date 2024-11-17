import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ description: 'ID a user.', example: '42' })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The email name of a user.',
    example: 'john.doe@fmdt.com',
  })
  @IsEmail()
  email: string;

  @IsString()
  role: string;
}
