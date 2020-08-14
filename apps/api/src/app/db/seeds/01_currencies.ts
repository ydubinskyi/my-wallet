import * as Knex from 'knex';

import { Currency } from '../models/currency.model';

export async function seed(knex: Knex) {
  await knex<Currency>('currency').del();

  await knex<Currency>('currency').insert([
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
  ]);
}
