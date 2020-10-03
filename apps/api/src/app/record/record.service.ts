import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';
import { Account } from '../account/entities/account.entity';

import { TABLES } from '../db/constants';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';
import { RecordType } from './types/recort-type.enum';

@Injectable()
export class RecordService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<Record>(TABLES.RECORD);
  }

  async create(user_id: number, createRecordDto: CreateRecordDto) {
    try {
      const {
        type,
        amount,
        description = '',
        account_id,
        category_id,
      } = createRecordDto;

      const { balance } = await this.connection
        .table<Account>(TABLES.ACCOUNT)
        .where({ id: account_id })
        .first();

      const newBalance =
        type === RecordType.INCREMENT ? balance + amount : balance - amount;

      return await this.connection.transaction(async (trx) => {
        const record_id = await trx<Record>(TABLES.RECORD).insert({
          type,
          amount,
          description,
          account_id,
          category_id,
          user_id,
        });

        await trx<Account>(TABLES.ACCOUNT).where({ id: account_id }).update({
          balance: newBalance,
        });

        return record_id;
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

  async update(user_id: number, id: number, updateRecordDto: UpdateRecordDto) {
    try {
      const item = await this.table.where({ id, user_id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      await this.table.where({ id, user_id }).update(updateRecordDto);

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

      const { account_id, amount } = item;

      const { balance } = await this.connection
        .table<Account>(TABLES.ACCOUNT)
        .where({ id: account_id })
        .first();

      const newBalance =
        item.type === RecordType.INCREMENT
          ? balance - amount
          : balance + amount;

      return await this.connection.transaction(async (trx) => {
        await trx<Record>(TABLES.RECORD).where({ id, user_id }).del();

        await trx<Account>(TABLES.ACCOUNT).where({ id: account_id }).update({
          balance: newBalance,
        });
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
