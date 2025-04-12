import { randomBytes } from "crypto";
import { StringValueObject } from "src/contexts/shared/domain/value-object/string-value-object";

export class UserVerificationToken extends StringValueObject {
    static create(): UserVerificationToken {
        return new UserVerificationToken(randomBytes(32).toString("hex"))
    }
}