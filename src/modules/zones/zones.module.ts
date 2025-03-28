import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Zone, ZoneSchema } from './zone.schema';
import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Zone.name, schema: ZoneSchema }]),
  ],
  controllers: [ZonesController],
  providers: [ZonesService],
  exports: [ZonesService],
})
export class ZonesModule {}
