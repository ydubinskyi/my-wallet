import { Module } from '@nestjs/common';
import * as Knex from 'knex';

const providers = [
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'sqlite3',
        connection: {
          filename: './my-wallet-db.sqlite',
        },
        debug: process.env.KNEX_DEBUG === 'true',
      });

      return knex;
    },
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DbModule {}
