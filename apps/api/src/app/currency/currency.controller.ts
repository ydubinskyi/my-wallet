import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CurrencyService } from './currency.service';

@ApiBearerAuth()
@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(AuthGuard())
  @Get()
  getAll() {
    return this.currencyService.findAll();
  }
}
