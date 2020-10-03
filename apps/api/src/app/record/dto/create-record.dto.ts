import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { RecordType } from '../types/recort-type.enum';

export class CreateRecordDto {
  @ApiProperty({ enum: Object.keys(RecordType) })
  @IsEnum(Object.keys(RecordType).filter((value) => typeof value !== 'number'))
  @IsNotEmpty()
  readonly type: RecordType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly account_id: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly category_id: number;
}
