import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { USERS_CONSTANTS } from "../route.constants";
import { SaveUserUseCase } from "src/contexts/users/application/save/save";
import { SaveUserDto } from "./save-user.dto";
import { UserAlreadyExistsException } from "src/contexts/users/domain/user-already-exists.exception";

@Controller(USERS_CONSTANTS)
export class SaveUserController {

    constructor(
        private readonly saveUserUseCase: SaveUserUseCase
    ) { }

    @Post("save")
    async run(
        @Body() saveUserDto: SaveUserDto
    ) {
        try {
            return await this.saveUserUseCase.execute({
                firstName: saveUserDto.firstName,
                lastName: saveUserDto.lastName,
                email: saveUserDto.email
            });
        } catch (error) {
            if (error instanceof UserAlreadyExistsException) {
                throw new BadRequestException(error.message);
            }
            throw error
        }
    }

}