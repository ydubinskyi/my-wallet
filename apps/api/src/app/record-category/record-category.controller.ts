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

import { RecordCategoryService } from './record-category.service';
import { CreateRecordCategoryDto } from './dto/create-record-category.dto';
import { UpdateRecordCategoryDto } from './dto/update-record-category.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('record-category')
export class RecordCategoryController {
  constructor(private readonly recordCategoryService: RecordCategoryService) {}

  @Post()
  create(@Body() createRecordCategoryDto: CreateRecordCategoryDto) {
    return this.recordCategoryService.create(createRecordCategoryDto);
  }

  @Get()
  findAll() {
    return this.recordCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordCategoryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecordCategoryDto: UpdateRecordCategoryDto
  ) {
    return this.recordCategoryService.update(+id, updateRecordCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.recordCategoryService.remove(+id);
  }
}
