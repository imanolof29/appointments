import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../auth.constants";
import { SignUpDto } from "src/contexts/auth/application/dto/sign-up.dto";
import { SignUpUseCase } from "src/contexts/auth/application/sign-up/sign-up";
import { UserAlreadyExistsException } from "src/contexts/users/domain/user-already-exists.exception";

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
                email: signUpDto.email,
                password: signUpDto.password,
            })
        } catch (error) {
            if (error instanceof UserAlreadyExistsException) {
                throw new BadRequestException(error.message);
            }
            throw error
        }
    }
}