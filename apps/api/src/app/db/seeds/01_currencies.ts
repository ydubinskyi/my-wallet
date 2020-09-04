import * as Knex from 'knex';

import { TABLES } from '../constants';

export async function seed(knex: Knex) {
  await knex(TABLES.CURRENCY).del();

  await knex(TABLES.CURRENCY).insert([
    {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
    },
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
    },
    {
      name: 'British Pound',
      code: 'GBP',
      symbol: '£',
    },
    {
      name: 'Polish Zloty',
      code: 'PLN',
      symbol: 'PLN',
    },
    {
      name: 'Ukrainian hryvna',
      code: 'UAH',
      symbol: 'UAH',
    },
  ]);
}
