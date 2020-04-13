import * as Knex from 'knex';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './my-wallet-db.sqlite',
  },
  migrations: {
    directory: './src/app/db/migrations',
    stub: './src/app/db/migration.stub',
  },
  seeds: {
    directory: './src/app/db/seeds',
    stub: './src/app/db/seed.stub',
  },
} as Knex.Config;
