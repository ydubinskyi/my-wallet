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
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@ApiTags('records')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(
    @User('userId') userId: number,
    @Body() createRecordDto: CreateRecordDto
  ) {
    return this.recordService.create(userId, createRecordDto);
  }

  @Get()
  findAll(@User('userId') userId: number) {
    return this.recordService.findAll(userId);
  }

  @Get(':id')
  findOne(@User('userId') userId: number, @Param('id') id: string) {
    return this.recordService.findOne(userId, +id);
  }

  @Put(':id')
  update(
    @User('userId') userId: number,
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto
  ) {
    return this.recordService.update(userId, +id, updateRecordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@User('userId') userId: number, @Param('id') id: string) {
    return this.recordService.remove(userId, +id);
  }
}
