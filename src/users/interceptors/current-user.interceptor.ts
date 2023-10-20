import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userID } = request.session || {};

    if (userID) {
      // get user if they exist and assign to the request so decorator can access
      const user = await this.usersService.findOne(userID);
      request.CurrentUser = user;
    }

    return handler.handle();
  }
}
