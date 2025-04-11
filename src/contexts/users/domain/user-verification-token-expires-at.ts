import { ValueObject } from "src/contexts/shared/domain/value-object/value-object";

export class UserVerificationTokenExpiresAt extends ValueObject<Date> {
    isExpired(): boolean {
        return this.value.getTime() < Date.now();
    }
}