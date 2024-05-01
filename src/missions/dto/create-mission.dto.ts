import { IsEnum, IsOptional, IsString } from "class-validator";
import { MissionStatus } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMissionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false, enum: MissionStatus })
  @IsOptional()
  @IsEnum(MissionStatus)
  status?: MissionStatus;
}

