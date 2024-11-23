import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Confirmation password must be at least 6 characters long',
  })
  confirmPassword: string;
}
