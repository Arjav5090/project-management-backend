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
} from '@nestjs/common';
import { ZonesService } from './zones.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';

@Controller('zones')
@UseGuards(JwtAuthGuard)
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Roles(Role.Admin)
  @Post()
  async createZone(@Body() body) {
    return this.zonesService.create(body);
  }

  @Roles(Role.Admin, Role.Supervisor, Role.Foreman)
  @Get('project/:projectId')
  async getZonesByProject(@Param('projectId') projectId: string) {
    return this.zonesService.findAllByProject(projectId);
  }

  @Roles(Role.Admin, Role.Supervisor, Role.Foreman)
  @Get(':id')
  async getZone(@Param('id') id: string) {
    const zone = await this.zonesService.findById(id);
    if (!zone) throw new NotFoundException('Zone not found');
    return zone;
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updateZone(@Param('id') id: string, @Body() body) {
    return this.zonesService.update(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteZone(@Param('id') id: string) {
    return this.zonesService.delete(id);
  }
}
