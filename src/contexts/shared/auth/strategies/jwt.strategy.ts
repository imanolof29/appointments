import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from "typeorm";
import { User } from "src/contexts/users/domain/user.entity";
import { UserNotFoundException } from "src/contexts/users/domain/user-not-found.exception";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        configService: ConfigService,
        private readonly userRepository: Repository<User>
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: { id: string }): Promise<User> {
        try {
            const { id } = payload

            const user = await this.userRepository.findOneBy({ id })

            if (!user) {
                throw new UserNotFoundException(id)
            }

            return user
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new UnauthorizedException(error.message);
            }
            throw new Error("An unexpected error occurred during authentication.");
        }
    }

}