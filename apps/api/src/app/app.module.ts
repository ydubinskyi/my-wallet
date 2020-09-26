import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { CurrencyModule } from './currency/currency.module';
import { UserModule } from './user/user.module';
import { UserCurrencyModule } from './user-currency/user-currency.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    UserModule,
    CurrencyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserCurrencyModule,
  ],
})
export class AppModule {}
