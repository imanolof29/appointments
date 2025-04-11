import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { UserNotFoundException } from "../../domain/user-not-found.exception";

@Injectable()
export class ActivateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundException(id)
        }
        await this.userRepository.save(user.activate());
    }

}