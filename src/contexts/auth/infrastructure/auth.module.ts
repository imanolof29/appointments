import { Module } from "@nestjs/common";
import { SignInController } from "./http/sign-in/sign-in.controller";
import { SignInUseCase } from "../application/sign-in/sign-in";
import { UsersModule } from "src/contexts/users/infrastructure/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
        }),
        UsersModule
    ],
    controllers: [
        SignInController
    ],
    providers: [
        SignInUseCase
    ]
})
export class AuthModule { }