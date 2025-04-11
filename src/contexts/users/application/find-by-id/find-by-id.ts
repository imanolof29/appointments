import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { User } from "../../domain/user.entity";

@Injectable()
export class FindByIdUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}