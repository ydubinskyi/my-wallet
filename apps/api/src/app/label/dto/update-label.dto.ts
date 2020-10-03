import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty } from 'class-validator';

export class UpdateLabelDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsHexColor()
  readonly color?: string;
}
