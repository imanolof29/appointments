import { Injectable } from "@nestjs/common";
import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

@Injectable()
export class SaveUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(properties: {
        firstName: string,
        lastName: string,
        email: string
    }): Promise<void> {
        const user = User.create({
            firstName: properties.firstName,
            lastName: properties.lastName,
            email: properties.email
        });
        const existingUser = await this.userRepository.findByEmail(user.email.value);
        if (existingUser) {
            throw new Error("User already exists");
        }
        await this.userRepository.save(user);
    }
}