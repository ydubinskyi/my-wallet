import { Module } from '@nestjs/common';

import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
