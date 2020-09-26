import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { UserCurrencyService } from './user-currency.service';
import { UserCurrencyController } from './user-currency.controller';

@Module({
  imports: [DbModule],
  controllers: [UserCurrencyController],
  providers: [UserCurrencyService],
})
export class UserCurrencyModule {}
