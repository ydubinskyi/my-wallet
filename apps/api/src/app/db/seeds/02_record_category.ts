import * as Knex from 'knex';

import { TABLES } from '../constants';

export async function seed(knex: Knex) {
  await knex(TABLES.RECORD_CATEGORY).del();

  await knex(TABLES.RECORD_CATEGORY).insert([
    {
      name: 'Food & Drinks',
    },
    {
      name: 'Shopping',
    },
    {
      name: 'Housing',
    },
    {
      name: 'Transportation',
    },
    {
      name: 'Vehicle',
    },
    {
      name: 'Life & Entertainment',
    },
    {
      name: 'Others',
    },
  ]);
}
