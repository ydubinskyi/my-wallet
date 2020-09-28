import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsHexColor()
  readonly color?: string;

  @ApiProperty()
  @IsString()
  readonly icon?: string;

  @ApiProperty()
  readonly parent_id?: number;
}
