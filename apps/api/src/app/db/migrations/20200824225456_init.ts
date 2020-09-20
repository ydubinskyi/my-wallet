import * as Knex from 'knex';
import { TABLES } from '../constants';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TABLES.CURRENCY, (t) => {
      t.increments('id').primary();

      t.string('name').notNullable();

      t.string('code').notNullable();

      t.string('symbol').notNullable();

      t.boolean('active').notNullable().defaultTo(true);

      t.timestamps(true, true);
    })
    .createTable(TABLES.USER, (t) => {
      t.increments('id').primary();

      t.string('username', 50).notNullable().unique().index();

      t.string('email', 250).notNullable().unique().index();

      t.string('password').notNullable();

      t.enum('role', ['admin', 'user']).notNullable().defaultTo('user');

      t.timestamps(true, true);

      t.integer('base_currency_id')
        .references('id')
        .inTable(TABLES.CURRENCY)
        .notNullable()
        .onDelete('cascade');
    })
    .createTable(TABLES.USER_CURRENCY, (t) => {
      t.increments('id').primary();

      t.float('exchange_rate').notNullable();

      t.timestamps(true, true);

      t.integer('user_id')
        .references('id')
        .inTable(TABLES.USER)
        .notNullable()
        .onDelete('cascade');

      t.integer('currency_id')
        .references('id')
        .inTable(TABLES.CURRENCY)
        .notNullable()
        .onDelete('cascade');
    })
    .createTable(TABLES.ACCOUNT, (t) => {
      t.increments('id').primary();

      t.string('name').notNullable();

      t.string('type').notNullable();

      t.decimal('start_amount').notNullable().defaultTo(0);

      t.decimal('balance').notNullable().defaultTo(0);

      t.text('description').notNullable();

      t.string('accent_color').notNullable();

      t.timestamps(true, true);

      t.integer('user_id')
        .references('id')
        .inTable(TABLES.USER)
        .notNullable()
        .onDelete('cascade');

      t.integer('user_currency_id')
        .references('id')
        .inTable(TABLES.USER_CURRENCY)
        .notNullable()
        .onDelete('cascade');
    })
    .createTable(TABLES.LABEL, (t) => {
      t.increments('id').primary();

      t.string('name').notNullable();

      t.string('color');

      t.timestamps(true, true);

      t.integer('user_id')
        .references('id')
        .inTable(TABLES.USER)
        .notNullable()
        .onDelete('cascade');
    })
    .createTable(TABLES.RECORD_CATEGORY, (t) => {
      t.increments('id').primary();

      t.string('name').notNullable();

      t.string('color');

      t.string('icon');

      t.timestamps(true, true);

      t.integer('parent_id')
        .references('id')
        .inTable(TABLES.RECORD_CATEGORY)
        .onDelete('cascade');
    })
    .createTable(TABLES.RECORD, (t) => {
      t.increments('id').primary();

      t.string('type').notNullable();

      t.decimal('amount').notNullable();

      t.text('description').notNullable();

      t.timestamps(true, true);

      t.integer('user_id')
        .references('id')
        .inTable(TABLES.USER)
        .notNullable()
        .onDelete('cascade');

      t.integer('account_id')
        .references('id')
        .inTable(TABLES.ACCOUNT)
        .notNullable()
        .onDelete('cascade');

      t.integer('category_id')
        .references('id')
        .inTable(TABLES.RECORD_CATEGORY)
        .notNullable()
        .onDelete('cascade');
    })
    .createTable(TABLES.RECORD_TEMPLATE, (t) => {
      t.increments('id').primary();

      t.string('type').notNullable();

      t.decimal('amount').notNullable();

      t.timestamps(true, true);

      t.integer('user_id')
        .references('id')
        .inTable(TABLES.USER)
        .notNullable()
        .onDelete('cascade');

      t.integer('account_id')
        .references('id')
        .inTable(TABLES.ACCOUNT)
        .notNullable()
        .onDelete('cascade');

      t.integer('category_id')
        .references('id')
        .inTable(TABLES.RECORD_CATEGORY)
        .notNullable()
        .onDelete('cascade');
    })
    .createTable(TABLES.RECORD_LABEL, (t) => {
      t.increments('id').primary();

      t.integer('label_id')
        .references('id')
        .inTable(TABLES.LABEL)
        .notNullable()
        .onDelete('cascade');

      t.integer('record_id')
        .references('id')
        .inTable(TABLES.RECORD)
        .notNullable()
        .onDelete('cascade');
    });
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTableIfExists(TABLES.USER)
    .dropTableIfExists(TABLES.CURRENCY)
    .dropTableIfExists(TABLES.USER)
    .dropTableIfExists(TABLES.ACCOUNT)
    .dropTableIfExists(TABLES.LABEL)
    .dropTableIfExists(TABLES.RECORD_CATEGORY)
    .dropTableIfExists(TABLES.RECORD)
    .dropTableIfExists(TABLES.RECORD_TEMPLATE)
    .dropTableIfExists(TABLES.RECORD_LABEL);
}
