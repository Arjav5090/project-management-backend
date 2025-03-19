import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import {
  Assignment,
  AssignmentDocument,
} from '../assignments/assignment.schema';
import { Zone, ZoneDocument } from '../zones/zone.schema';
import { BuildLog, BuildLogDocument } from '../buildlogs/build-logs.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Assignment.name)
    private assignmentModel: Model<AssignmentDocument>,
    @InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>,
    @InjectModel(BuildLog.name) private buildLogModel: Model<BuildLogDocument>,
  ) {}

  async create(data: Partial<Project>): Promise<Project> {
    return new this.projectModel(data).save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.projectModel.findById(id).exec();
    return project || null; // ✅ Explicitly return null if not found
  }

  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedProject || null; // ✅ Handle null case
  }

  async delete(id: string): Promise<{ message: string }> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');

    console.log(`Deleting all related data for project: ${id}`);

    await this.assignmentModel.deleteMany({ projectId: id }).exec();

    await this.buildLogModel.deleteMany({ projectId: id }).exec();

    const zones: ZoneDocument[] = await this.zoneModel
      .find({ projectId: id })
      .exec();
    const zoneIds: string[] = zones.map((zone: ZoneDocument) =>
      String(zone._id),
    );

    if (zoneIds.length > 0) {
      await this.zoneModel.deleteMany({ projectId: id }).exec();

      await this.buildLogModel.deleteMany({ zoneId: { $in: zoneIds } }).exec();

      await this.assignmentModel
        .deleteMany({ zoneId: { $in: zoneIds } })
        .exec();
    }

    await this.projectModel.findByIdAndDelete(id).exec();

    return { message: 'Project and all related data deleted successfully' };
  }
}
