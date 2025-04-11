import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { AuthDto } from "../dto/auth.dto";
import { EncryptService } from "src/contexts/shared/domain/services/encrypt.service";
import { UserNotVerifiedException } from "../../domain/user-not-verified.exception";

@Injectable()
export class SignInUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly enctryptService: EncryptService
    ) { }

    async execute(properties: {
        email: string
        password: string
    }): Promise<AuthDto> {
        const user = await this.userRepository.findByEmail(properties.email);
        if (!user) {
            throw new UserNotFoundException(properties.email);
        }
        const passwordMatch = await this.enctryptService.compare(
            properties.password,
            user.password.value
        )
        if (!passwordMatch) {
            throw new BadRequestException("Invalid credentials");
        }

        if (!user.verificationStatus.value) {
            throw new UserNotVerifiedException()
        }

        const token = this.jwtService.sign({
            id: user.id.value,
        })
        return new AuthDto(token);

    }
}