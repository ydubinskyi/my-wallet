import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';

import { Currency } from '../db/models/currency.model';
import { TABLES } from '../db/constants';
import { CreateCurrencyDTO } from './dto/create-currency.dto';
import { UpdateCurrencyDTO } from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<Currency>(TABLES.CURRENCY);
  }

  async findAll(): Promise<Currency[]> {
    return await this.table.select('*');
  }

  async create(params: CreateCurrencyDTO): Promise<Currency> {
    try {
      return await this.table.insert(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, params: UpdateCurrencyDTO): Promise<Currency> {
    try {
      const items = await this.table.where({ id });

      if (items.length < 1) {
        throw new NotFoundException();
      }

      return this.table.where({ id }).update(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: number) {
    try {
      const items = await this.table.where({ id });

      if (items.length < 1) {
        throw new NotFoundException();
      }

      return this.table.where({ id }).del();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
