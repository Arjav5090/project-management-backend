/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';

@Controller('assignments')
@UseGuards(JwtAuthGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Roles(Role.Admin)
  @Post()
  async assignUser(@Body() body) {
    return this.assignmentsService.assignUser(
      body.projectId,
      body.userId,
      body.role,
      body.zoneId,
    );
  }

  @Roles(Role.Admin, Role.Supervisor, Role.Foreman, Role.User)
  @Get('user/:userId')
  async getUserAssignments(@Param('userId') userId: string) {
    return this.assignmentsService.getAssignmentsByUser(userId);
  }

  @Roles(Role.Admin, Role.Supervisor)
  @Get('project/:projectId')
  async getProjectAssignments(@Param('projectId') projectId: string) {
    return this.assignmentsService.getAssignmentsByProject(projectId);
  }

  @Roles(Role.Admin, Role.Supervisor, Role.Foreman)
  @Get('project/:projectId/zone/:zoneId')
  async getZoneAssignments(
    @Param('projectId') projectId: string,
    @Param('zoneId') zoneId: string,
  ) {
    return this.assignmentsService.getAssignmentsByZone(projectId, zoneId);
  }

  @Roles(Role.Admin)
  @Delete(':projectId/:userId')
  async removeAssignment(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
    @Param('zoneId') zoneId?: string,
  ) {
    return this.assignmentsService.removeAssignment(projectId, userId, zoneId);
  }
}
