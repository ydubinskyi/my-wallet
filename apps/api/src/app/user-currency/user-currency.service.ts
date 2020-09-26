import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';

import { TABLES } from '../db/constants';
import { CreateUserCurrencyDto } from './dto/create-user-currency.dto';
import { UpdateUserCurrencyDto } from './dto/update-user-currency.dto';
import { UserCurrency } from './entities/user-currency.entity';

@Injectable()
export class UserCurrencyService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<UserCurrency>(TABLES.USER_CURRENCY);
  }

  async create(user_id: number, createUserCurrencyDto: CreateUserCurrencyDto) {
    try {
      const { exchange_rate, currency_id } = createUserCurrencyDto;

      const userCurrency = {
        user_id,
        exchange_rate,
        currency_id,
      };
      return await this.table.insert(userCurrency);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(user_id: number) {
    return await this.table.select('*').where({ user_id });
  }

  async findOne(user_id: number, id: number) {
    try {
      const item = await this.table.select('*').where({ id, user_id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      return item;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(
    user_id: number,
    id: number,
    updateUserCurrencyDto: UpdateUserCurrencyDto
  ) {
    try {
      const item = await this.table.where({ id, user_id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      await this.table.where({ id, user_id }).update(updateUserCurrencyDto);

      return this.table.where({ id, user_id }).select('*').first();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(user_id: number, id: number) {
    try {
      const item = await this.table.where({ id, user_id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      return this.table.where({ id, user_id }).del();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
