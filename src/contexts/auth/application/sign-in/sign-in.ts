import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { AuthDto } from "../dto/auth.dto";

@Injectable()
export class SignInUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async execute(properties: {
        email: string
    }): Promise<AuthDto> {
        const user = await this.userRepository.findByEmail(properties.email);
        if (!user) {
            throw new UserNotFoundException(properties.email);
        }
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
        })
        return new AuthDto(token);

    }
}