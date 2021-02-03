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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../shared/decorators';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(
    @User('userId') userId: number,
    @Body() createAccountDto: CreateAccountDto
  ) {
    return this.accountService.create(userId, createAccountDto);
  }

  @Get()
  findAll(@User('userId') userId: number) {
    return this.accountService.findAll(userId);
  }

  @Get(':id')
  findOne(@User('userId') userId: number, @Param('id') id: string) {
    return this.accountService.findOne(userId, +id);
  }

  @Put(':id')
  update(
    @User('userId') userId: number,
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    return this.accountService.update(userId, +id, updateAccountDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@User('userId') userId: number, @Param('id') id: string) {
    return this.accountService.remove(userId, +id);
  }
}
