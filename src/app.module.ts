require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MissionsModule } from './missions/missions.module';
import { SpacecraftsModule } from './spacecrafts/spacecrafts.module';
import { CelestialBodiesModule } from './celestial-bodies/celestial-bodies.module';
import { MongooseModule } from '@nestjs/mongoose';
  
@Module({
  imports: [MissionsModule, SpacecraftsModule, CelestialBodiesModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


