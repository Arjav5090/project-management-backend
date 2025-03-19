import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { ZonesModule } from './modules/zones/zones.module';
import { AssignmentsModule } from './modules/assignments/assignments.module';
import { BuildLogsModule } from './modules/buildlogs/build-logs.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    ZonesModule,
    AssignmentsModule,
    BuildLogsModule,
  ], // <-- Add missing modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
