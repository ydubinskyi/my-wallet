import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { CurrencyModule } from './currency/currency.module';
import { UserModule } from './user/user.module';
import { UserCurrencyModule } from './user-currency/user-currency.module';
import { AccountModule } from './account/account.module';
import { RecordCategoryModule } from './record-category/record-category.module';
import { RecordModule } from './record/record.module';
import { LabelModule } from './label/label.module';

@Module({
  imports: [
    DbModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    UserModule,
    CurrencyModule,
    UserCurrencyModule,
    AccountModule,
    RecordCategoryModule,
    RecordModule,
    LabelModule,
  ],
})
export class AppModule {}
