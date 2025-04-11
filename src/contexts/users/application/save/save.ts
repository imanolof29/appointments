import { Injectable } from "@nestjs/common";
import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { UserAlreadyExistsException } from "../../domain/user-already-exists.exception";
import { EncryptService } from "src/contexts/shared/domain/services/encrypt.service";

@Injectable()
export class SaveUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptService: EncryptService,
    ) { }

    async execute(properties: {
        firstName: string,
        lastName: string,
        email: string
        password: string
    }): Promise<void> {
        const enctryptedPassword = await this.encryptService.encrypt(properties.password);
        const user = User.createPendingVerification({
            firstName: properties.firstName,
            lastName: properties.lastName,
            email: properties.email,
            password: enctryptedPassword,
        });
        const existingUser = await this.userRepository.findByEmail(user.email.value);
        if (existingUser) {
            throw new UserAlreadyExistsException(user.email.value);
        }
        await this.userRepository.save(user);
    }
}