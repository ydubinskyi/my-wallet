import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const currentPage = request['page'] || 1;
  const perPage = request['per_page'] || 10;

  return { currentPage, perPage };
});
