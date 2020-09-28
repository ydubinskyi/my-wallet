import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';

import { TABLES } from '../db/constants';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<Account>(TABLES.ACCOUNT);
  }

  async create(user_id: number, createAccountDto: CreateAccountDto) {
    try {
      const {
        name,
        type,
        start_amount,
        description = '',
        accent_color = '#000000',
        user_currency_id,
      } = createAccountDto;

      return await this.table.insert({
        name,
        type,
        start_amount,
        description,
        balance: start_amount,
        accent_color,
        user_currency_id,
        user_id,
      });
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
    updateAccountDto: UpdateAccountDto
  ) {
    try {
      const item = await this.table.where({ id, user_id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      const updatedAccount = {
        ...updateAccountDto,
        balance:
          updateAccountDto.start_amount === item.start_amount
            ? item.balance
            : item.balance - item.start_amount + updateAccountDto.start_amount,
      };

      await this.table.where({ id, user_id }).update(updatedAccount);

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
