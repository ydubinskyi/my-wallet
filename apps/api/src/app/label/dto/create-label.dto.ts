import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateLabelDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional()
  @IsHexColor()
  readonly color?: string;
}
