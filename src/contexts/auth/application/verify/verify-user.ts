import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { VerificationException } from "../../domain/verification.exception";

@Injectable()
export class VerifyUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(properties: {
        token: string,
        userId: string
    }) {
        const user = await this.userRepository.findById(properties.userId);

        if (!user) {
            throw new VerificationException('User not found');
        }

        const verifiedUser = user.verify(properties.token);

        if (!verifiedUser) {
            throw new VerificationException('Invalid or expired verification token');
        }

        await this.userRepository.save(verifiedUser);
    }
}
