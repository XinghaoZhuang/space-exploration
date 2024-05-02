import { Module } from '@nestjs/common';
import { CelestialBodiesService } from './celestial-bodies.service';
import { CelestialBodiesController } from './celestial-bodies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CelestialBody, CelestialBodySchema } from './schemas/celestial-body.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CelestialBody.name, schema: CelestialBodySchema }])],
  controllers: [CelestialBodiesController],
  providers: [CelestialBodiesService],
})
export class CelestialBodiesModule {}
