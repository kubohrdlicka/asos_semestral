import { IsEmail, IsNumber, IsString } from 'class-validator';
import BaseDto from 'src/common/dto/base.dto';

export class GetUserDto extends BaseDto {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}
