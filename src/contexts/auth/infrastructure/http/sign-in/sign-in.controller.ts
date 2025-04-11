import { BadRequestException, Body, Controller, NotFoundException, Post, UseGuards } from "@nestjs/common";
import { AUTH_CONSTANTS } from "../auth.constants";
import { SignInUseCase } from "src/contexts/auth/application/sign-in/sign-in";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";
import { SignInDto } from "src/contexts/auth/application/dto/sign-in.dto";
import { AuthDto } from "src/contexts/auth/application/dto/auth.dto";
import { UserNotVerifiedException } from "src/contexts/auth/domain/user-not-verified.exception";

@Controller(AUTH_CONSTANTS)
export class SignInController {

    constructor(
        private readonly signInUseCase: SignInUseCase
    ) { }

    @Post("sign-in")
    async run(
        @Body() signInDto: SignInDto,
    ): Promise<AuthDto> {
        try {
            return await this.signInUseCase.execute({
                email: signInDto.email,
                password: signInDto.password,
            })
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof UserNotVerifiedException) {
                throw new BadRequestException(error.message);
            }
            throw error
        }
    }

}