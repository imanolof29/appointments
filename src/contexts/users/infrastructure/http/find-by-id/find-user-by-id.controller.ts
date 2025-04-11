import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { USERS_CONSTANTS } from "../route.constants";
import { FindByIdUserUseCase } from "src/contexts/users/application/find-by-id/find-by-id";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";

@Controller(USERS_CONSTANTS)
export class FindUserByIdController {
    constructor(
        private readonly findByIdUserUseCase: FindByIdUserUseCase
    ) { }

    @Get("find/:id")
    async run(
        @Param("id") id: string
    ) {
        try {
            return await this.findByIdUserUseCase.execute(id);
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error
        }
    }

}