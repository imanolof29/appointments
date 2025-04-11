import { Injectable } from "@nestjs/common";
import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

@Injectable()
export class FindUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        if (!users) {
            throw new Error("Users not found");
        }
        return users;
    }
}