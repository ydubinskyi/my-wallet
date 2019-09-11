import { Module } from '@nestjs/common';

import { DbModule } from './db.module';
import { CurrencyModule } from './currency/currency.module';

import { AppController } from './app.controller';

@Module({
  imports: [CurrencyModule, DbModule],
  controllers: [AppController],
})
export class AppModule {}
