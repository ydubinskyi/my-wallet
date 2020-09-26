import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

import { UserService } from '../user/user.service';
import { RegisterUserDTO } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (user && (await this.compareHash(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterUserDTO) {
    const newUser = await this.userService.create(user);

    if (!newUser) {
      throw new UnauthorizedException();
    }

    return this.login(newUser);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
