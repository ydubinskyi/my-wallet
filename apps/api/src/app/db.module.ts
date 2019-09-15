import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { Currency } from './currency/currency.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    // TODO: Find workaround for entities and migrations problem
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${path.resolve(__dirname)}/wallet-db.sqlite`,
      entities: [Currency, User],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
