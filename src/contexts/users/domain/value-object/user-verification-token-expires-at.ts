import { ValueObject } from "src/contexts/shared/domain/value-object/value-object";

export class UserVerificationTokenExpiresAt extends ValueObject<Date> {

    static create(): UserVerificationTokenExpiresAt {
        return new UserVerificationTokenExpiresAt(new Date(Date.now() + 1000 * 60 * 60 * 24))
    }

    isExpired(): boolean {
        return this.value.getTime() < Date.now();
    }
}