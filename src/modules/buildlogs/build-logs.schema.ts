import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BuildLogDocument = BuildLog & Document;

@Schema({ timestamps: true })
export class BuildLog extends Document {
  @Prop({ required: true, type: String })
  date: string;

  @Prop({ type: String, required: true })
  site: string; // Site name or identifier

  @Prop({ required: true, type: String })
  description: string; // Log description

  @Prop({ type: Number, default: 0 })
  totalLength: number; // Total pipeline length

  @Prop({ type: [{ size: String, length: Number, material: String }] })
  pipelineDetails: { size: string; length: number; material: string }[];

  @Prop({ type: Number, default: 0 })
  manholes: number;

  @Prop({ type: Number, default: 0 })
  hscChambers: number;

  @Prop({ type: Number, default: 0 })
  roadRestoration: number;

  @Prop({ type: String, default: '' })
  notes: string; // Optional notes for logs

  @Prop({ type: String, ref: 'Project' })
  projectId: string;

  @Prop({ type: String, ref: 'Zone', required: false })
  zoneId?: string; // Optional (logs can belong to a zone)

  @Prop({ type: String, ref: 'User' })
  createdBy: string;
}

export const BuildLogSchema = SchemaFactory.createForClass(BuildLog);
