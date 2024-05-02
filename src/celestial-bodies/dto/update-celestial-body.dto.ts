import { PartialType } from '@nestjs/mapped-types';
import { CreateCelestialBodyDto } from './create-celestial-body.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCelestialBodyDto extends CreateCelestialBodyDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
}
