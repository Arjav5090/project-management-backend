import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Assignment, AssignmentSchema } from '../assignments/assignment.schema';
import { BuildLog, BuildLogSchema } from '../buildlogs/build-logs.schema';
import { Zone, ZoneSchema } from '../zones/zone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Assignment.name, schema: AssignmentSchema },
      { name: Zone.name, schema: ZoneSchema },
      { name: BuildLog.name, schema: BuildLogSchema },
    ]),
  ],
  controllers: [ProjectsController], // ✅ Ensure correct import
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
