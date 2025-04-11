export class VerificationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "VerificationException";
    }
}