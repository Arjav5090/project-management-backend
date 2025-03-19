import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildLog, BuildLogSchema } from './build-logs.schema';
import { BuildLogsService } from './build-logs.service';
import { BuildLogsController } from './build-logs.controller';
import { Zone, ZoneSchema } from '../zones/zone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BuildLog.name, schema: BuildLogSchema },
      { name: Zone.name, schema: ZoneSchema },
    ]),
  ],
  controllers: [BuildLogsController],
  providers: [BuildLogsService],
  exports: [BuildLogsService],
})
export class BuildLogsModule {}
