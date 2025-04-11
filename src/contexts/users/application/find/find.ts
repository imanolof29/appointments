import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { UserPrimitives } from "../../domain/user.entity";

@Injectable()
export class FindUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(): Promise<UserPrimitives[]> {
        const users = await this.userRepository.findAll();
        if (!users) {
            throw new Error("Users not found");
        }
        return users.map(user => user.toPrimitives());
    }
}