import { Module } from "@nestjs/common";
import { SignInController } from "./http/sign-in/sign-in.controller";
import { SignInUseCase } from "../application/sign-in/sign-in";
import { UsersModule } from "src/contexts/users/infrastructure/users.module";
import { SignUpController } from "./http/sign-up/sign-up.controller";
import { SignUpUseCase } from "../application/sign-up/sign-up";
import { VerifyUserUseCase } from "../application/verify/verify-user";
import { VerifyUserController } from "./http/verify-user/verify-user.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedModule } from "src/contexts/shared/infrastructure/shared.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
        }),
        SharedModule,
    ],
    controllers: [
        SignInController,
        SignUpController,
        VerifyUserController,
    ],
    providers: [
        SignInUseCase,
        SignUpUseCase,
        VerifyUserUseCase
    ],
})
export class AuthModule { }