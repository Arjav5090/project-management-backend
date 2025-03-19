/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BuildLogsService } from './build-logs.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';
import { CreateBuildLogDto } from './create-build-log.dto';
import { UpdateBuildLogDto } from './update-build-log.dto';

@UseGuards(JwtAuthGuard)
@Controller('build-logs')
export class BuildLogsController {
  constructor(private readonly buildLogsService: BuildLogsService) {}

  /** ✅ Admin, Foreman, and Supervisor can create logs */
  @Roles(Role.Admin, Role.Foreman, Role.Supervisor)
  @Post()
  async createBuildLog(@Body() body: CreateBuildLogDto) {
    return this.buildLogsService.create(body);
  }

  /** ✅ Admin can view all logs */
  @Roles(Role.Admin)
  @Get()
  async getAllBuildLogs() {
    return this.buildLogsService.findAll();
  }

  /** ✅ Admin, Foreman, and Supervisor can get logs for a specific project */
  @Roles(Role.Admin, Role.Supervisor, Role.Foreman, Role.User)
  @Get('project/:projectId')
  async getBuildLogsByProject(@Param('projectId') projectId: string) {
    return this.buildLogsService.findByProject(projectId);
  }

  /** ✅ Fetch zones belonging to a project */
  @Roles(Role.Admin, Role.Supervisor, Role.Foreman, Role.User)
  @Get('zones/project/:projectId')
  async getZonesByProject(@Param('projectId') projectId: string) {
    return this.buildLogsService.findZonesByProject(projectId);
  }

  @Roles(Role.Admin, Role.Supervisor, Role.Foreman, Role.User)
  @Post('multi-zone')
  async getBuildLogsByMultipleZones(@Body() body: { zoneIds: string[] }) {
    return this.buildLogsService.findByMultipleZones(body.zoneIds);
  }

  /** ✅ Admin, Foreman, and Supervisor can get logs for a specific zone */
  @Roles(Role.Admin, Role.Supervisor, Role.Foreman, Role.User)
  @Get('zone/:zoneId')
  async getBuildLogsByZone(@Param('zoneId') zoneId: string) {
    return this.buildLogsService.findByZone(zoneId);
  }

  /** ✅ Admin, Foreman, and Supervisor can update logs */
  @Roles(Role.Admin, Role.Foreman, Role.Supervisor)
  @Patch(':logId')
  async updateBuildLog(
    @Param('logId') logId: string,
    @Body() body: UpdateBuildLogDto,
  ) {
    return this.buildLogsService.update(logId, body);
  }

  /** ✅ Only Admin can delete logs */
  @Roles(Role.Admin)
  @Delete(':logId')
  async deleteBuildLog(@Param('logId') logId: string) {
    return this.buildLogsService.delete(logId);
  }
}
