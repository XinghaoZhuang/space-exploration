import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SpacecraftStatus } from '../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema()
export class Spacecraft {
  @ApiProperty()
  _id: string

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty({ enum: SpacecraftStatus })
  @Prop({ default: SpacecraftStatus.Unknown })
  status: SpacecraftStatus;

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

export const SpacecraftSchema = SchemaFactory.createForClass(Spacecraft);
