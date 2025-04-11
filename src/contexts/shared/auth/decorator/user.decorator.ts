import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user || !user.id) {
        throw new InternalServerErrorException('User ID not found in request');
    }

    return user.id.value;
})