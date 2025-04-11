import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "src/contexts/users/domain/user.entity";
import { UserRepository } from "src/contexts/users/domain/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        configService: ConfigService,
        private readonly userRepository: UserRepository
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: { id: string }): Promise<User> {
        try {
            ;
            const user = await this.userRepository.findById(payload.id);

            if (!user) {
                throw new UnauthorizedException(`User with id ${payload.id} not found`);
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException("Authentication failed");
        }
    }

}