import { Controller, Get, Param } from "@nestjs/common";
import { USERS_CONSTANTS } from "../route.constants";
import { FindByIdUserUseCase } from "src/contexts/users/application/find-by-id/find-by-id";

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
        } catch (e) {
            throw e
        }
    }

}