import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// creates a param-type decorator that can be used as a route-parameter
export const GetUser = createParamDecorator(
  // data: takes in the data sent from the client, which can be anything or nothing
  // if data is defined, it will select the specific field of the same name
  // ctx: the requests can arrive by any type of protocol, here we switch it to HTTP protocol and take in the request object
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
