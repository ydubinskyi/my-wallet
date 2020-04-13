import { Injectable, Inject } from '@nestjs/common';
import { Currency } from '../db/models/currency.model';
import * as Knex from 'knex';

@Injectable()
export class CurrencyService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  findAll(): Promise<Currency[]> {
    return this.connection.table<Currency>('currency').select('*');
  }
}
