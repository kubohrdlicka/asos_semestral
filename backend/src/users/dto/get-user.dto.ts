import { IsEmail, IsNumber, IsString } from 'class-validator';
import BaseDto from 'src/common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto extends BaseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;
}
