import { Injectable, Inject } from '@nestjs/common';
import * as Knex from 'knex';

import { Currency } from '../db/models/currency.model';
import { TABLES } from '../db/constants';

@Injectable()
export class CurrencyService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  findAll(): Promise<Currency[]> {
    return this.connection.table<Currency>(TABLES.CURRENCY).select('*');
  }
}
