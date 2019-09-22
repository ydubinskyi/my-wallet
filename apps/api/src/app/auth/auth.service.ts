import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getUserByUsername(username);

    if (user && (await this.userService.compareHash(password, user.password))) {
      return user.toJSON();
    }

    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user) {
    const newUser = await this.userService.createUser(user);

    if (!newUser) {
      throw new UnauthorizedException();
    }

    return this.login(newUser);
  }
}