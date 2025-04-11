import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../auth.constants";
import { JwtGuard } from "src/contexts/shared/auth/guards/jwt.guard";
import { CurrentUser } from "src/contexts/shared/auth/decorator/user.decorator";
import { User } from "src/contexts/users/domain/user.entity";
import { VerifyUserUseCase } from "src/contexts/auth/application/verify/verify-user";

@Controller(AUTH_CONSTANTS)
export class VerifyUserController {

    constructor(
        private readonly verifyUserUseCase: VerifyUserUseCase
    ) { }

    @UseGuards(JwtGuard)
    @Get("verify-user/:token")
    async run(
        @Param("token") token: string,
        @CurrentUser() user: User,
    ) {
        try {
            await this.verifyUserUseCase.execute({
                token,
                userId: user.id.value,
            });
        } catch (error) {
            throw error;
        }
    }

}