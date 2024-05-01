import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionDto } from './create-mission.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMissionDto extends CreateMissionDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
}
