import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from './assignment.schema';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
  ) {}

  async assignUser(
    projectId: string,
    userId: string,
    role: string,
    zoneId?: string,
  ): Promise<Assignment> {
    const assignment = new this.assignmentModel({
      projectId,
      userId,
      role,
      zoneId,
    });
    return assignment.save();
  }

  async getAssignmentsByProject(projectId: string): Promise<Assignment[]> {
    return this.assignmentModel.find({ projectId }).exec();
  }

  async getAssignmentsByZone(
    projectId: string,
    zoneId: string,
  ): Promise<Assignment[]> {
    return this.assignmentModel.find({ projectId, zoneId }).exec();
  }

  async getAssignmentsByUser(userId: string): Promise<Assignment[]> {
    return this.assignmentModel.find({ userId }).exec();
  }

  async removeAssignment(
    projectId: string,
    userId: string,
    zoneId?: string,
  ): Promise<void> {
    const query = { projectId, userId };
    if (zoneId) query['zoneId'] = zoneId;

    const result = await this.assignmentModel.deleteOne(query).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Assignment not found');
    }
  }
}
