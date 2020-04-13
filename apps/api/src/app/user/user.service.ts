import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor() {}

  async getUsers(): Promise<User[]> {
    return null;
  }

  async getUserByUsername(username: string): Promise<User> {
    return null;
  }

  async createUser(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);

    try {
      return null;
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
