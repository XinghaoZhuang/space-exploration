import { PartialType } from '@nestjs/mapped-types';
import { CreateSpacecraftDto } from './create-spacecraft.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpacecraftDto extends CreateSpacecraftDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
}
