import { Injectable } from "@nestjs/common";
import { EncryptService } from "src/contexts/shared/domain/services/encrypt.service";
import { UserAlreadyExistsException } from "src/contexts/users/domain/user-already-exists.exception";
import { User } from "src/contexts/users/domain/user.entity";
import { UserRepository } from "src/contexts/users/domain/user.repository";

@Injectable()
export class SignUpUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptService: EncryptService,
    ) { }

    async execute(properties: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    }) {
        const encryptedPassword = await this.encryptService.encrypt(properties.password)
        const user = User.createPendingVerification({
            firstName: properties.firstName,
            lastName: properties.lastName,
            email: properties.email,
            password: encryptedPassword
        })
        const existingUser = await this.userRepository.findByEmail(properties.email);
        if (existingUser) {
            throw new UserAlreadyExistsException(properties.email);
        }
        await this.userRepository.save(user);
    }

}