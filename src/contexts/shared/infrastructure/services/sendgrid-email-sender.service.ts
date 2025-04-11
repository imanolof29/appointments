import { ConfigService } from "@nestjs/config";
import { EmailSenderService } from "../../domain/services/email-sender.service";
import * as SendGrid from '@sendgrid/mail';

export class SendgridEmailSenderService extends EmailSenderService {

    constructor(private configService: ConfigService) {
        super();
        // const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
        // SendGrid.setApiKey(apiKey);
    }

    async sendEmail(): Promise<void> {
        console.log("Sending email")
    }
}