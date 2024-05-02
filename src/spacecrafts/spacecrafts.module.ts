import { Module } from '@nestjs/common';
import { SpacecraftsService } from './spacecrafts.service';
import { SpacecraftsController } from './spacecrafts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Spacecraft, SpacecraftSchema } from './schemas/spacecraft.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Spacecraft.name, schema: SpacecraftSchema }])],
  controllers: [SpacecraftsController],
  providers: [SpacecraftsService],
})
export class SpacecraftsModule {}
