import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { User } from "../../domain/user.entity";
import { UserNotFoundException } from "../../domain/user-not-found.exception";

@Injectable()
export class FindByIdUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundException(id)
        }
        return user;
    }
}