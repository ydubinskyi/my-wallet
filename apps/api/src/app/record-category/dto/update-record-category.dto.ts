import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsString } from 'class-validator';

export class UpdateRecordCategoryDto {
  @ApiProperty()
  @IsString()
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
