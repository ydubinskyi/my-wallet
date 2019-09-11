import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { Currency } from './currency/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${path.resolve(__dirname)}/wallet-db.sqlite`,
      entities: [Currency],
      synchronize: true,
      migrations: ['./migrations/*.ts'],
      cli: {
        migrationsDir: './migrations',
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
