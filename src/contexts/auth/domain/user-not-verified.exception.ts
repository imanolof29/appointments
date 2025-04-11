export class UserNotVerifiedException extends Error {
    constructor() {
        super("User not verified");
        this.name = "UserNotVerifiedException";
    }
}