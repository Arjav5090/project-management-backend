import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ZoneDocument = Zone & Document;

@Schema()
export class Zone extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  projectId: string; // Linked to Project

  @Prop({ required: true })
  description: string; // Admin ID
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
