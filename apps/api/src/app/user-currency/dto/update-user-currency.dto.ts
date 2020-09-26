import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserCurrencyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly exchange_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly currency_id: number;
}
