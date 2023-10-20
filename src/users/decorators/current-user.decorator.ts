import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // Session obj
    // get underlining request
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userID);
    // UsersService instance
  },
);
