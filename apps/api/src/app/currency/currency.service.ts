import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';

import { TABLES } from '../db/constants';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<Currency>(TABLES.CURRENCY);
  }

  async create(params: CreateCurrencyDto): Promise<Currency> {
    try {
      return await this.table.insert(params);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Currency[]> {
    return await this.table.select('*');
  }

  async findOne(id: number): Promise<Currency> {
    try {
      const items = await this.table.where({ id });

      if (items.length < 1) {
        throw new NotFoundException();
      }

      return this.table.select('*').where({ id }).first();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, params: UpdateCurrencyDto): Promise<Currency> {
    try {
      const items = await this.table.where({ id });

      if (items.length < 1) {
        throw new NotFoundException();
      }

      await this.table.where({ id }).update(params);

      return this.table.where({ id }).select('*').first();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number) {
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
