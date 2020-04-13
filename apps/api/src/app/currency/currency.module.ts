import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [AuthModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
