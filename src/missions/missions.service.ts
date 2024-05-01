import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMissionDto } from './dto/create-mission.dto';
import { Mission } from './schemas/mission.schema';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Injectable()
export class MissionsService {
  constructor(@InjectModel(Mission.name) private readonly missionModel: Model<Mission>) {}

  async create(createMissionDto: CreateMissionDto): Promise<Mission> {
    const createdMission = await this.missionModel.create(createMissionDto);
    return createdMission;
  }

  async update(id: string, updateMissionDto: UpdateMissionDto): Promise<void> {
    const mission = await this.missionModel.findOne({ _id: id }).select('deleted').exec();
    if (!mission || mission.deleted) {
      throw new NotFoundException('mission not found');
    }

    await this.missionModel.updateOne({ _id: id }, updateMissionDto).exec();
  }

  async findAll(page: number, perPage: number, name?: string): Promise<Mission[]> {
    const filter = {
      deleted: false,
    } as any;
    if (name) {
      filter.name = {
        $regex: name,
        $options: 'i',
      }
    }

    return this.missionModel
      .find(filter)
      .skip(page * perPage)
      .limit(perPage)
      .sort('-_id')
      .exec();
  }

  async findOne(id: string): Promise<Mission> {
    const mission = await this.missionModel.findOne({ _id: id }).exec();
    if (!mission || mission.deleted) {
      throw new NotFoundException('mission not found');
    }

    return mission;
  }

  async delete(id: string) {
    const mission = await this.missionModel.findOne({ _id: id }).select('deleted').exec();
    if (!mission || mission.deleted) {
      throw new NotFoundException('mission not found');
    }

    await this.missionModel.updateOne({ _id: id }, { deleted: true }).exec();
  }
}