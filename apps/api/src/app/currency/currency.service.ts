import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';
import { IWithPagination } from 'knex-paginate';

import { PaginationParams } from '../shared/types/pagination-params.interface';
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

  async findAll({
    page,
    perPage,
  }: PaginationParams): Promise<IWithPagination<Currency[]>> {
    return await this.table
      .select('*')
      .paginate({ perPage, currentPage: page });
  }

  async findOne(id: number): Promise<Currency> {
    try {
      const item = await this.table.where({ id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      return this.table.select('*').where({ id }).first();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, params: UpdateCurrencyDto): Promise<Currency> {
    try {
      const item = await this.table.where({ id }).first();

      if (!item) {
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
      const item = await this.table.where({ id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      return this.table.where({ id }).del();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
