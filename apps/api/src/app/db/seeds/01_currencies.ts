import * as Knex from 'knex';

import { TABLES } from '../constants';

export async function seed(knex: Knex) {
  await knex(TABLES.CURRENCY).del();

  await knex(TABLES.CURRENCY).insert([
    {
      id: 101,
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
    },
    {
      id: 102,
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
    },
    {
      id: 103,
      name: 'British Pound',
      code: 'GBP',
      symbol: '£',
    },
    {
      id: 104,
      name: 'Polish Zloty',
      code: 'PLN',
      symbol: 'PLN',
    },
    {
      id: 105,
      name: 'Ukrainian hryvna',
      code: 'UAH',
      symbol: 'UAH',
    },
  ]);
}
