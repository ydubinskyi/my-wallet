import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as Knex from 'knex';

import { TABLES } from '../db/constants';
import { User } from '../db/models/user.model';
import { RegisterUserDTO } from '../auth/dto/register-user.dto';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@Inject('KnexConnection') private readonly connection: Knex) {}

  async getUsers(): Promise<IUser[]> {
    return await (
      await this.connection.table<User>(TABLES.USER).select('*')
    ).map((item) => {
      delete item.password;
      return item;
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.connection
      .table<User>(TABLES.USER)
      .select('*')
      .where({ username })
      .first();
  }

  async createUser(userDTO: RegisterUserDTO): Promise<IUser> {
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

  async compareHash(
    password: string | undefined,
    hash: string | undefined
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
