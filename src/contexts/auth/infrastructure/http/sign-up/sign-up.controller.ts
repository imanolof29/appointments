import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../auth.constants";
import { SignUpDto } from "src/contexts/auth/application/dto/sign-up.dto";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";
import { SignUpUseCase } from "src/contexts/auth/application/sign-up/sign-up";

@Controller(AUTH_CONSTANTS)
export class SignUpController {

    constructor(
        private readonly signUpUseCase: SignUpUseCase
    ) { }


    @Post("sign-up")
    async run(
        @Body() signUpDto: SignUpDto,
    ): Promise<void> {
        try {
            return await this.signUpUseCase.execute({
                firstName: signUpDto.firstName,
                lastName: signUpDto.lastName,
                email: signUpDto.email
            })
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error
        }
    }
}