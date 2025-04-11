export abstract class EmailSenderService {
    abstract sendEmail(): Promise<void>;
}