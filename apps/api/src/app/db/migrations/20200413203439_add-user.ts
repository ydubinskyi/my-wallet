import * as Knex from 'knex';
import { TABLES } from '../constants';

const tableName = TABLES.USER;

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.string('username', 50)
      .notNullable()
      .unique()
      .index();

    t.string('email', 250)
      .notNullable()
      .unique()
      .index();

    t.string('password').notNullable();

    t.enum('role', ['Admin', 'User'])
      .notNullable()
      .defaultTo('User');

    t.dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(tableName);
}
