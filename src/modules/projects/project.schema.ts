import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document; // ✅ Define Mongoose Document Type

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ enum: ['active', 'completed'], default: 'active' })
  status: string;

  @Prop({ required: true })
  createdBy: string; // Admin ID
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    const projectId = this._id;
    const AssignmentModel = this.model('Assignment'); // Ensure correct model reference
    const ZoneModel = this.model('Zone');
    const BuildLogModel = this.model('BuildLog');

    await AssignmentModel.deleteMany({ projectId });
    await ZoneModel.deleteMany({ projectId });
    await BuildLogModel.deleteMany({ projectId });

    next();
  },
);
