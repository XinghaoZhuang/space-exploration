import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCelestialBodyDto } from './dto/create-celestial-body.dto';
import { CelestialBody } from './schemas/celestial-body.schema';
import { UpdateCelestialBodyDto } from './dto/update-celestial-body.dto';

@Injectable()
export class CelestialBodiesService {
  constructor(@InjectModel(CelestialBody.name) private readonly celestialBodyModel: Model<CelestialBody>) {}

  async create(createCelestialBodyDto: CreateCelestialBodyDto): Promise<CelestialBody> {
    const createdCelestialBody = await this.celestialBodyModel.create(createCelestialBodyDto);
    return createdCelestialBody;
  }

  async update(id: string, updateCelestialBodyDto: UpdateCelestialBodyDto): Promise<void> {
    const celestialBody = await this.celestialBodyModel.findOne({ _id: id }).select('deleted').exec();
    if (!celestialBody || celestialBody.deleted) {
      throw new NotFoundException('celestialBody not found');
    }

    await this.celestialBodyModel.updateOne({ _id: id }, updateCelestialBodyDto).exec();
  }

  async findAll(page: number, perPage: number, name?: string): Promise<CelestialBody[]> {
    const filter = {
      deleted: false,
    } as any;
    if (name) {
      filter.name = {
        $regex: name,
        $options: 'i',
      }
    }

    return this.celestialBodyModel
      .find(filter)
      .skip(page * perPage)
      .limit(perPage)
      .sort('-_id')
      .exec();
  }

  async findOne(id: string): Promise<CelestialBody> {
    const celestialBody = await this.celestialBodyModel.findOne({ _id: id }).exec();
    if (!celestialBody || celestialBody.deleted) {
      throw new NotFoundException('celestialBody not found');
    }

    return celestialBody;
  }

  async delete(id: string) {
    const celestialBody = await this.celestialBodyModel.findOne({ _id: id }).select('deleted').exec();
    if (!celestialBody || celestialBody.deleted) {
      throw new NotFoundException('celestialBody not found');
    }

    await this.celestialBodyModel.updateOne({ _id: id }, { deleted: true }).exec();
  }
}