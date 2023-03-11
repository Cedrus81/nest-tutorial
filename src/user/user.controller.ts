import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

// it is better to use custom classes instead of AuthGuard('jwt') since open strings are more prone to errors
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    // since the jwt strategy returns an object called user, and appends it to the request, typescript knows to expect such a field
    // User model comes from the prisma model we made
    return user;
  }
}
