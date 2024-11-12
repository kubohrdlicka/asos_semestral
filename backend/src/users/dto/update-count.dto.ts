import { IsNumber } from 'class-validator';

export class UpdateCountDto {
  @IsNumber()
  count: number;
}
