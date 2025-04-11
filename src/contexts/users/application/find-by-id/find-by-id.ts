import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { UserNotFoundException } from "../../domain/user-not-found.exception";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class FindByIdUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundException(id)
        }
        return UserDto.fromPrimitives(user.toPrimitives());
    }
}