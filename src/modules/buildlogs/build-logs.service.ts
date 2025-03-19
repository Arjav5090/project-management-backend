import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuildLog } from './build-logs.schema';
import { CreateBuildLogDto } from './create-build-log.dto';
import { UpdateBuildLogDto } from './update-build-log.dto';

@Injectable()
export class BuildLogsService {
  constructor(
    @InjectModel(BuildLog.name) private buildLogModel: Model<BuildLog>,
    @InjectModel('Zone') private zoneModel: Model<any>, // Injecting the Zone model
  ) {}

  async create(logData: CreateBuildLogDto): Promise<BuildLog> {
    return this.buildLogModel.create(logData);
  }

  async findAll(): Promise<BuildLog[]> {
    return this.buildLogModel
      .find()
      .populate('projectId', 'name')
      .populate('zoneId', 'name')
      .populate('createdBy', 'email');
  }

  async findByProject(projectId: string): Promise<BuildLog[]> {
    return this.buildLogModel
      .find({ projectId })
      .populate('zoneId', 'name')
      .populate('createdBy', 'email');
  }

  async findByZone(zoneId: string): Promise<BuildLog[]> {
    return this.buildLogModel
      .find({ zoneId })
      .populate('projectId', 'name')
      .populate('createdBy', 'email');
  }

  async findByMultipleZones(zoneIds: string[]): Promise<BuildLog[]> {
    return this.buildLogModel
      .find({ zoneId: { $in: zoneIds } }) // ✅ Fetch logs for multiple zones
      .populate('projectId', 'name')
      .populate('zoneId', 'name')
      .populate('createdBy', 'email');
  }

  async findZonesByProject(projectId: string): Promise<any[]> {
    return this.zoneModel.find({ projectId }).select('name _id').exec();
  }

  async update(
    logId: string,
    updateData: UpdateBuildLogDto,
  ): Promise<BuildLog> {
    const updatedLog = await this.buildLogModel.findByIdAndUpdate(
      logId,
      updateData,
      { new: true },
    );
    if (!updatedLog) throw new NotFoundException('Build log not found');
    return updatedLog;
  }

  async delete(logId: string): Promise<void> {
    const deleted = await this.buildLogModel.findByIdAndDelete(logId);
    if (!deleted) throw new NotFoundException('Build log not found');
  }
}
