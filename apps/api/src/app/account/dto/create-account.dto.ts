import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsHexColor, IsNotEmpty, IsNumber } from 'class-validator';
import { AccountType } from '../types/account-type.enum';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ enum: Object.keys(AccountType) })
  @IsEnum(Object.keys(AccountType).filter((value) => typeof value !== 'number'))
  @IsNotEmpty()
  readonly type: AccountType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly start_amount: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  @IsHexColor()
  readonly accent_color: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly user_currency_id: number;
}
