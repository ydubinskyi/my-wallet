import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateRecordDto {
  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly category_id: number;
}
