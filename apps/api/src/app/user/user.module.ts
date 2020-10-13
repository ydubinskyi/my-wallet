import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserCurrencyService } from '../user-currency/user-currency.service';

@Module({
  imports: [DbModule, AuthModule],
  providers: [UserCurrencyService, UserService],
  controllers: [UserController],
})
export class UserModule {}
