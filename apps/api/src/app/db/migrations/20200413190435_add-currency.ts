import * as Knex from 'knex';
import { TABLES } from '../constants';

const tableName = TABLES.CURRENCY;

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.string('name').notNullable();

    t.string('code').notNullable();

    t.string('symbol').notNullable();

    t.boolean('isActive')
      .notNullable()
      .defaultTo(true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(tableName);
}
