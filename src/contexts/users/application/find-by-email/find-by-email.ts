import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { User } from "../../domain/user.entity";

@Injectable()
export class FindByEmailUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}