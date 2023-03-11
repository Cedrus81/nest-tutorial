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
