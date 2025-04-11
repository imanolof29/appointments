import { BooleanValueObject } from "src/contexts/shared/domain/value-object/boolean-value-object";

export class UserStatus extends BooleanValueObject {

    static active(): UserStatus {
        return new UserStatus(true);
    }

    static inactive(): UserStatus {
        return new UserStatus(false);
    }

    isActive(): boolean {
        return this.value;
    }

}