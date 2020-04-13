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
    return await this.connection.table<User>(TABLES.USER).select('*');
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.connection
      .table<User>(TABLES.USER)
      .select('*')
      .where({ username })
      .first();
  }

  async createUser(user: RegisterUserDTO): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);

    try {
      return this.connection.table<User>(TABLES.USER).insert(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
