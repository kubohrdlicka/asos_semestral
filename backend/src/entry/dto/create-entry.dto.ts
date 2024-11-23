import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
} from 'class-validator';

enum Type {
  NOTE = 'note',
  TASK = 'task',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export class CreateEntryDto {
  @ApiProperty({ enum: Type })
  @IsEnum(Type)
  type: Type;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: Priority })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  deadline?: Date;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  iconName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  tagId?: number;

  @ApiProperty()
  @IsNumber()
  ownerId: number;
}
