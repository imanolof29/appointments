import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsException } from "src/contexts/users/domain/user-already-exists.exception";
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
        const user = User.createPendingVerification({
            firstName: properties.firstName,
            lastName: properties.lastName,
            email: properties.email,
        })
        const existingUser = await this.userRepository.findByEmail(properties.email);
        if (existingUser) {
            throw new UserAlreadyExistsException(properties.email);
        }
        await this.userRepository.save(user);
    }

}