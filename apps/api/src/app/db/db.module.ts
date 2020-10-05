import { Module } from '@nestjs/common';
import * as Knex from 'knex';
import { attachPaginate } from 'knex-paginate';

const providers = [
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'sqlite3',
        connection: {
          filename: './apps/api/my-wallet-db.sqlite',
        },
        debug: process.env.KNEX_DEBUG === 'true',
      });

      attachPaginate();

      return knex;
    },
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DbModule {}
