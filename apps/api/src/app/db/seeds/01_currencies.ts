import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  await knex('currency').del();

  await knex('currency').insert([
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
