import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { UserPrimitives } from "../../domain/user.entity";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class FindUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(): Promise<UserDto[]> {
        const users = await this.userRepository.findAll();
        if (!users) {
            throw new Error("Users not found");
        }
        return users.map(user => UserDto.fromPrimitives(user.toPrimitives()));
    }
}