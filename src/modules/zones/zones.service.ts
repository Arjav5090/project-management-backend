import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Zone } from './zone.schema';

@Injectable()
export class ZonesService {
  constructor(@InjectModel(Zone.name) private zoneModel: Model<Zone>) {}

  async create(data: Partial<Zone>): Promise<Zone> {
    return new this.zoneModel(data).save();
  }

  async findAllByProject(projectId: string): Promise<Zone[]> {
    return this.zoneModel.find({ projectId }).exec();
  }

  async findById(id: string): Promise<Zone | null> {
    return this.zoneModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Zone>): Promise<Zone | null> {
    return this.zoneModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.zoneModel.findByIdAndDelete(id);
  }
}
