import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mission, MissionSchema } from './schemas/mission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mission.name, schema: MissionSchema }])],
  controllers: [MissionsController],
  providers: [MissionsService],
})
export class MissionsModule {}
