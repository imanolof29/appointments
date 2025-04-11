import { forwardRef, Module } from "@nestjs/common";
import { EmailSenderService } from "../domain/services/email-sender.service";
import { SendgridEmailSenderService } from "./services/sendgrid-email-sender.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "src/contexts/users/infrastructure/users.module";
import { EncryptService } from "../domain/services/encrypt.service";
import { BcryptService } from "./services/bcrypt.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule,
        ConfigModule,
        forwardRef(() => UsersModule)
    ],
    providers: [
        {
            provide: EmailSenderService,
            useClass: SendgridEmailSenderService
        },
        {
            provide: EncryptService,
            useClass: BcryptService
        },
        JwtStrategy
    ],
    exports: [PassportModule, JwtStrategy, JwtModule, EncryptService]
})
export class SharedModule { }