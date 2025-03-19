import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssignmentDocument = Assignment & Document;
@Schema()
export class Assignment extends Document {
  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ enum: ['supervisor', 'foreman', 'user'], required: true })
  role: string;

  @Prop({ required: false }) // Optional: If null, assignment is project-wide
  zoneId?: string;

  @Prop({ default: Date.now })
  assignedAt: Date;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
