import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const page = request['page'] || 1;
  const perPage = request['per_page'] || 10;

  return { page, perPage };
});
