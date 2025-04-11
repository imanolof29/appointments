import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../auth.constants";
import { SignInUseCase } from "src/contexts/auth/application/sign-in/sign-in";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";

@Controller(AUTH_CONSTANTS)
export class SignInController {

    constructor(
        private readonly signInUseCase: SignInUseCase
    ) { }

    @Post("sign-in")
    async run(
        @Body("email") email: string,
    ) {
        try {
            return await this.signInUseCase.execute({
                email
            })
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error
        }
    }

}