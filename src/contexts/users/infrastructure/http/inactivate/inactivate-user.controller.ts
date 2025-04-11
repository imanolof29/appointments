import { Controller, Post, UseGuards } from "@nestjs/common";
import { USERS_CONSTANTS } from "../route.constants";
import { JwtGuard } from "src/contexts/shared/auth/guards/jwt.guard";
import { CurrentUser } from "src/contexts/shared/auth/decorator/user.decorator";
import { InactivateUserUseCase } from "src/contexts/users/application/inactivate/inactivate-user";

@Controller(USERS_CONSTANTS)
export class InactivateUserController {

    constructor(
        private readonly inactivateUserUseCase: InactivateUserUseCase
    ) { }

    @UseGuards(JwtGuard)
    @Post("inactivate")
    async run(
        @CurrentUser() user: string
    ) {
        try {
            return await this.inactivateUserUseCase.execute(user);
        } catch (error) {
            throw error
        }
    }

}