import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CurrencyService } from './currency.service';
import { CreateCurrencyDTO } from './dto/create-currency.dto';
import { UpdateCurrencyDTO } from './dto/update-currency.dto';

@ApiBearerAuth()
@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  getAll() {
    return this.currencyService.findAll();
  }

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDTO) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCurrencyDto: UpdateCurrencyDTO
  ) {
    return this.currencyService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.currencyService.delete(id);
  }
}
