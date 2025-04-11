import { Controller, Get } from "@nestjs/common";
import { FindUsersUseCase } from "src/contexts/users/application/find/find";
import { USERS_CONSTANTS } from "../route.constants";

@Controller(USERS_CONSTANTS)
export class FindUsersController {
    constructor(
        private readonly findUsersUseCase: FindUsersUseCase,
    ) { }

    @Get("find")
    async run() {
        try {
            return await this.findUsersUseCase.execute();
        } catch (e) {
            throw e
        }
    }

}