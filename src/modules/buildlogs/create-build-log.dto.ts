/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateBuildLogDto {
  @IsString()
  date: string;

  @IsString()
  site: string;

  @IsString()
  description: string;

  @IsNumber()
  totalLength: number;

  @IsArray()
  pipelineDetails: { size: string; length: number; material: string }[];

  @IsNumber()
  manholes: number;

  @IsNumber()
  hscChambers: number;

  @IsNumber()
  roadRestoration: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  projectId: string;

  @IsString()
  @IsOptional()
  zoneId?: string;

  @IsString()
  createdBy: string;
}
