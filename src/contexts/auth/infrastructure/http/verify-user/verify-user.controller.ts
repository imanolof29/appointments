import { BadRequestException, Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../auth.constants";
import { JwtGuard } from "src/contexts/shared/auth/guards/jwt.guard";
import { CurrentUser } from "src/contexts/shared/auth/decorator/user.decorator";
import { User } from "src/contexts/users/domain/user.entity";
import { VerifyUserUseCase } from "src/contexts/auth/application/verify/verify-user";
import { VerificationException } from "src/contexts/auth/domain/verification.exception";

@Controller(AUTH_CONSTANTS)
export class VerifyUserController {

    constructor(
        private readonly verifyUserUseCase: VerifyUserUseCase
    ) { }

    @UseGuards(JwtGuard)
    @Get("verify-user/:token")
    async run(
        @Param("token") token: string,
        @CurrentUser() user: string,
    ) {
        try {
            return await this.verifyUserUseCase.execute({
                token,
                userId: user,
            });
        } catch (error) {
            if (error instanceof VerificationException) {
                throw new BadRequestException(error.message);
            }
            throw error;
        }
    }

}