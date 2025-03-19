/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildLogDto } from './create-build-log.dto';

export class UpdateBuildLogDto extends PartialType(CreateBuildLogDto) {}
