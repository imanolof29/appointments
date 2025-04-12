import { StringValueObject } from "src/contexts/shared/domain/value-object/string-value-object";

export class UserRole extends StringValueObject {
    static default(): UserRole {
        return new UserRole("user");
    }
}