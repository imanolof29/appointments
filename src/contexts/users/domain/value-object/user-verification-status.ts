import { BooleanValueObject } from "src/contexts/shared/domain/value-object/boolean-value-object";

export class UserVerificationStatus extends BooleanValueObject {

    static verified(): UserVerificationStatus {
        return new UserVerificationStatus(true);
    }

    static unverified(): UserVerificationStatus {
        return new UserVerificationStatus(false);
    }

}