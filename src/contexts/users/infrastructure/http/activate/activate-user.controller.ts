import { Controller, Post, UseGuards } from "@nestjs/common";
import { USERS_CONSTANTS } from "../route.constants";
import { JwtGuard } from "src/contexts/shared/auth/guards/jwt.guard";
import { CurrentUser } from "src/contexts/shared/auth/decorator/user.decorator";
import { ActivateUserUseCase } from "src/contexts/users/application/activate/activate-user";

@Controller(USERS_CONSTANTS)
export class ActivateUserController {

    constructor(
        private readonly activateUserUseCase: ActivateUserUseCase
    ) { }

    @UseGuards(JwtGuard)
    @Post("activate")
    async run(
        @CurrentUser() user: string
    ) {
        try {
            return await this.activateUserUseCase.execute(user);
        } catch (error) {
            throw error
        }
    }

}