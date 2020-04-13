import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
