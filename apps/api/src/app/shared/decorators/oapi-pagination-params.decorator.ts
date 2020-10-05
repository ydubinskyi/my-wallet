import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

export function OApiPaginationParams() {
  return applyDecorators(
    ApiParam({ name: 'page', type: 'number', required: false, example: 1 }),
    ApiParam({ name: 'per_page', type: 'number', required: false, example: 10 })
  );
}
