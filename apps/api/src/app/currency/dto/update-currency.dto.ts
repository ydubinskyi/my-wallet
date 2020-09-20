import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCurrencyDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly symbol: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly active: boolean;
}
