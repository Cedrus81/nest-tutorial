import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  // in concept it shouldn't know about jwt since we didnt import this strategy
  // 'jwt' is already imported as default value at PassportStrategy
  constructor() {
    super();
  }
}
