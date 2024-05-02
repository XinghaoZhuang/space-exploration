import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DiscoveryStatus } from '../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema()
export class CelestialBody {
  @ApiProperty()
  _id: string

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty({ enum: DiscoveryStatus })
  @Prop({ default: DiscoveryStatus.Unknown })
  status: DiscoveryStatus;

  @ApiProperty({ required: false })
  @Prop()
  description: string;

  // soft deletion: if the item is removed, the deleted should be true
  @ApiProperty()
  @Prop({ default: false, index: true })
  deleted: boolean;

  @ApiProperty()
  @Prop({ default: Date.now })
  createDate: Date;
}

export const CelestialBodySchema = SchemaFactory.createForClass(CelestialBody);
