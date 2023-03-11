import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// creates a param-type decorator that can be used as a route-parameter
export const GetUser = createParamDecorator(
  // data: takes in the data sent from the client, which can be anything or nothing
  // ctx: the requests can arrive by any type of protocol, here we switch it to HTTP protocol and take in the request object
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// example for extracting a specific field from the request:
export const GetUserEmail = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) return request.user[data];
  },
);
