import { IsEnum, IsOptional, IsString } from "class-validator";
import { SpacecraftStatus } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpacecraftDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false, enum: SpacecraftStatus })
  @IsOptional()
  @IsEnum(SpacecraftStatus)
  status?: SpacecraftStatus;
}

