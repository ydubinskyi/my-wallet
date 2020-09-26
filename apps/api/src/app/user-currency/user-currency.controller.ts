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
} from '@nestjs/common';
import { UserCurrencyService } from './user-currency.service';
import { CreateUserCurrencyDto } from './dto/create-user-currency.dto';
import { UpdateUserCurrencyDto } from './dto/update-user-currency.dto';

@Controller('users/:userId/currencies')
export class UserCurrencyController {
  constructor(private readonly userCurrencyService: UserCurrencyService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body() createUserCurrencyDto: CreateUserCurrencyDto
  ) {
    return this.userCurrencyService.create(+userId, createUserCurrencyDto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.userCurrencyService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.userCurrencyService.findOne(+userId, +id);
  }

  @Put(':id')
  update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateUserCurrencyDto: UpdateUserCurrencyDto
  ) {
    return this.userCurrencyService.update(+userId, +id, updateUserCurrencyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.userCurrencyService.remove(+userId, +id);
  }
}
