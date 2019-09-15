import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DbModule } from './db.module';
import { AuthModule } from './auth/auth.module';
import { CurrencyModule } from './currency/currency.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DbModule,
    CurrencyModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
