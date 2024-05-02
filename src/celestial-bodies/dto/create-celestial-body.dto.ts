import { IsEnum, IsOptional, IsString } from "class-validator";
import { DiscoveryStatus } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCelestialBodyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false, enum: DiscoveryStatus })
  @IsOptional()
  @IsEnum(DiscoveryStatus)
  status?: DiscoveryStatus;
}

