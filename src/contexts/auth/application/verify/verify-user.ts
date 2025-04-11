import { Injectable } from "@nestjs/common";
import { User } from "src/contexts/users/domain/user.entity";
import { UserRepository } from "src/contexts/users/domain/user.repository";

@Injectable()
export class VerifyUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(properties: {
        token: string,
        user: User
    }) {
        const verifiedUser = properties.user.verify(properties.token);
        if (!verifiedUser) {
            throw new Error("Invalid token");
        }
        await this.userRepository.save(verifiedUser);
    }

}