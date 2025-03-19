/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';
import { Request } from 'express';

// ✅ Define AuthenticatedRequest with `user.id`
interface AuthenticatedRequest extends Request {
  user: { id: string; email: string; role: string };
}

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * ✅ Create a new project (Only Admin)
   * Extracts `createdBy` from authenticated user (JWT)
   */
  @Roles(Role.Admin)
  @Post()
  async createProject(@Body() body, @Req() req: AuthenticatedRequest) {
    console.log('Authenticated User:', req.user); // ✅ Debugging log

    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    const adminId = req.user.id; // ✅ Now TypeScript recognizes `id`
    return this.projectsService.create({ ...body, createdBy: adminId });
  }

  /**
   * ✅ Get all projects (Only Admin)
   */
  @Roles(Role.Admin)
  @Get()
  async getProjects() {
    return this.projectsService.findAll();
  }

  /**
   * ✅ Get a project by ID (Admin, Supervisor, Foreman)
   */
  @Roles(Role.Admin, Role.Supervisor, Role.Foreman)
  @Get(':id')
  async getProject(@Param('id') id: string) {
    const project = await this.projectsService.findById(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  /**
   * ✅ Update project (Only Admin)
   */
  @Roles(Role.Admin)
  @Patch(':id')
  async updateProject(@Param('id') id: string, @Body() body) {
    const updatedProject = await this.projectsService.update(id, body);
    if (!updatedProject) throw new NotFoundException('Project not found');
    return updatedProject;
  }

  /**
   * ✅ Delete project (Only Admin)
   */
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
