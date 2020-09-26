import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../shared/decorators';
import { UserCurrencyService } from './user-currency.service';
import { CreateUserCurrencyDto } from './dto/create-user-currency.dto';
import { UpdateUserCurrencyDto } from './dto/update-user-currency.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user-currencies')
export class UserCurrencyController {
  constructor(private readonly userCurrencyService: UserCurrencyService) {}

  @Post()
  create(
    @User('userId') userId: number,
    @Body() createUserCurrencyDto: CreateUserCurrencyDto
  ) {
    return this.userCurrencyService.create(userId, createUserCurrencyDto);
  }

  @Get()
  findAll(@User('userId') userId: number) {
    return this.userCurrencyService.findAll(userId);
  }

  @Get(':id')
  findOne(@User('userId') userId: number, @Param('id') id: string) {
    return this.userCurrencyService.findOne(userId, +id);
  }

  @Put(':id')
  update(
    @User('userId') userId: number,
    @Param('id') id: string,
    @Body() updateUserCurrencyDto: UpdateUserCurrencyDto
  ) {
    return this.userCurrencyService.update(userId, +id, updateUserCurrencyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@User('userId') userId: number, @Param('id') id: string) {
    return this.userCurrencyService.remove(userId, +id);
  }
}
