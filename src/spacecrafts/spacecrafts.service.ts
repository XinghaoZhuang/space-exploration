import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSpacecraftDto } from './dto/create-spacecraft.dto';
import { Spacecraft } from './schemas/spacecraft.schema';
import { UpdateSpacecraftDto } from './dto/update-spacecraft.dto';

@Injectable()
export class SpacecraftsService {
  constructor(@InjectModel(Spacecraft.name) private readonly spacecraftModel: Model<Spacecraft>) {}

  async create(createSpacecraftDto: CreateSpacecraftDto): Promise<Spacecraft> {
    const createdSpacecraft = await this.spacecraftModel.create(createSpacecraftDto);
    return createdSpacecraft;
  }

  async update(id: string, updateSpacecraftDto: UpdateSpacecraftDto): Promise<void> {
    const spacecraft = await this.spacecraftModel.findOne({ _id: id }).select('deleted').exec();
    if (!spacecraft || spacecraft.deleted) {
      throw new NotFoundException('spacecraft not found');
    }

    await this.spacecraftModel.updateOne({ _id: id }, updateSpacecraftDto).exec();
  }

  async findAll(page: number, perPage: number, name?: string): Promise<Spacecraft[]> {
    const filter = {
      deleted: false,
    } as any;
    if (name) {
      filter.name = {
        $regex: name,
        $options: 'i',
      }
    }

    return this.spacecraftModel
      .find(filter)
      .skip(page * perPage)
      .limit(perPage)
      .sort('-_id')
      .exec();
  }

  async findOne(id: string): Promise<Spacecraft> {
    const spacecraft = await this.spacecraftModel.findOne({ _id: id }).exec();
    if (!spacecraft || spacecraft.deleted) {
      throw new NotFoundException('spacecraft not found');
    }

    return spacecraft;
  }

  async delete(id: string) {
    const spacecraft = await this.spacecraftModel.findOne({ _id: id }).select('deleted').exec();
    if (!spacecraft || spacecraft.deleted) {
      throw new NotFoundException('spacecraft not found');
    }

    await this.spacecraftModel.updateOne({ _id: id }, { deleted: true }).exec();
  }
}