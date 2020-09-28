import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';

import { TABLES } from '../db/constants';
import { RecordCategory } from './entities/record-category.entity';
import { CreateRecordCategoryDto } from './dto/create-record-category.dto';
import { UpdateRecordCategoryDto } from './dto/update-record-category.dto';

@Injectable()
export class RecordCategoryService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<RecordCategory>(TABLES.RECORD_CATEGORY);
  }

  async create(createRecordCategoryDto: CreateRecordCategoryDto) {
    try {
      return await this.table.insert(createRecordCategoryDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.table.select('*');
  }

  async findOne(id: number) {
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

  async update(id: number, updateRecordCategoryDto: UpdateRecordCategoryDto) {
    try {
      const item = await this.table.where({ id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      const newRecordCategory = {
        ...item,
        ...updateRecordCategoryDto,
      };

      await this.table.where({ id }).update(newRecordCategory);

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
