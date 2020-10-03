import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';

import { TABLES } from '../db/constants';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<Label>(TABLES.USER_CURRENCY);
  }

  async create(user_id: number, createLabelDto: CreateLabelDto) {
    try {
      const { name, color = '#ffffff' } = createLabelDto;

      return await this.table.insert({
        name,
        color,
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

  async update(user_id: number, id: number, updateLabelDto: UpdateLabelDto) {
    try {
      const item = await this.table.where({ id, user_id }).first();

      if (!item) {
        throw new NotFoundException();
      }

      await this.table.where({ id, user_id }).update(updateLabelDto);

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
