import { Module } from "@nestjs/common";
import { EmailSenderService } from "../domain/services/email-sender.service";
import { SendgridEmailSenderService } from "./email/sendgrid-email-sender.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "src/contexts/users/infrastructure/users.module";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule,
        ConfigModule,
        UsersModule
    ],
    providers: [
        {
            provide: EmailSenderService,
            useClass: SendgridEmailSenderService
        },
        JwtStrategy
    ],
    exports: [PassportModule, JwtStrategy, JwtModule]
})
export class SharedModule { }