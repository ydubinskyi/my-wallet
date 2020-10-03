import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';

@Module({
  imports: [DbModule],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule {}
