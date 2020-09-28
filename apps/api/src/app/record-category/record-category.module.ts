import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { RecordCategoryService } from './record-category.service';
import { RecordCategoryController } from './record-category.controller';

@Module({
  imports: [DbModule],
  controllers: [RecordCategoryController],
  providers: [RecordCategoryService],
})
export class RecordCategoryModule {}
