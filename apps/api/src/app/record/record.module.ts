import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';

@Module({
  imports: [DbModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
