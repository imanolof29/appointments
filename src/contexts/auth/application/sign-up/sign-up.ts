import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";
import { User } from "src/contexts/users/domain/user.entity";
import { UserRepository } from "src/contexts/users/domain/user.repository";

@Injectable()
export class SignUpUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(properties: {
        firstName: string,
        lastName: string,
        email: string,
    }) {
        const user = User.create({
            firstName: properties.firstName,
            lastName: properties.lastName,
            email: properties.email,
            verificationStatus: false,
            //TODO: Add verification token
            verificationToken: undefined
        })
        const existingUser = await this.userRepository.findByEmail(properties.email);
        if (!existingUser) {
            throw new UserNotFoundException(properties.email);
        }
        await this.userRepository.save(user);
    }

}