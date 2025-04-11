import { Module } from "@nestjs/common";
import { EmailSenderService } from "../domain/services/email-sender.service";
import { SendgridEmailSenderService } from "./email/sendgrid-email-sender.service";

@Module({
    imports: [],
    providers: [
        {
            provide: EmailSenderService,
            useClass: SendgridEmailSenderService
        }
    ]
})
export class SharedModule { }