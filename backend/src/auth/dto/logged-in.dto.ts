import { IsObject, IsString } from 'class-validator';
import { GetUserDto } from '../../users/dto/get-user.dto';

export class LoggedInDto {
  @IsString()
  readonly access_token: string;

  @IsObject()
  readonly user: GetUserDto;
}
