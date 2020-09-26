import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() _body: LoginUserDTO, @Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  async register(@Body() registerUserDto: RegisterUserDTO) {
    return this.authService.register(registerUserDto);
  }
}
