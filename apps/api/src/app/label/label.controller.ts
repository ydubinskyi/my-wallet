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
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(
    @User('userId') userId: number,
    @Body() createLabelDto: CreateLabelDto
  ) {
    return this.labelService.create(userId, createLabelDto);
  }

  @Get()
  findAll(@User('userId') userId: number) {
    return this.labelService.findAll(userId);
  }

  @Get(':id')
  findOne(@User('userId') userId: number, @Param('id') id: string) {
    return this.labelService.findOne(userId, +id);
  }

  @Put(':id')
  update(
    @User('userId') userId: number,
    @Param('id') id: string,
    @Body() updateLabelDto: UpdateLabelDto
  ) {
    return this.labelService.update(userId, +id, updateLabelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@User('userId') userId: number, @Param('id') id: string) {
    return this.labelService.remove(userId, +id);
  }
}
