export class InvalidJwtException extends Error {
    constructor() {
        super("Invalid JWT");
        this.name = "InvalidJwtException";
    }
}