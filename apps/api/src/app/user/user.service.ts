import {
  Injectable,
  BadRequestException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as Knex from 'knex';

import { TABLES } from '../db/constants';
import { User } from './entities/user.entity';
import { RegisterUserDTO } from '../auth/dto/register-user.dto';
import { IUser } from './types/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  private get table() {
    return this.connection.table<User>(TABLES.USER);
  }

  async create(userDTO: RegisterUserDTO): Promise<User> {
    const newUser = new User();

    newUser.email = userDTO.email;
    newUser.username = userDTO.username;
    newUser.password = await bcrypt.hash(userDTO.password, 10);
    newUser.base_currency_id = 101;

    try {
      return this.connection.table<User>(TABLES.USER).insert(newUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<IUser[]> {
    const usersWithPassword = await this.table.select('*');

    return usersWithPassword.map((item) => {
      delete item.password;
      return item;
    });
  }

  async findOne(id: number): Promise<User> {
    try {
      const items = await this.table.where({ id });

      if (items.length < 1) {
        throw new NotFoundException();
      }

      const user = await this.table.select('*').where({ id }).first();
      delete user.password;

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      const items = await this.table.where({ username });

      if (items.length < 1) {
        throw new NotFoundException();
      }

      return this.table.select('*').where({ username }).first();
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
