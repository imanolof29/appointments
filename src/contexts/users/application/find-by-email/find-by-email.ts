import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { User } from "../../domain/user.entity";
import { UserNotFoundException } from "../../domain/user-not-found.exception";

@Injectable()
export class FindByEmailUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFoundException(email)
        }
        return user;
    }
}