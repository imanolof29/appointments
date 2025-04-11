import { AggregateRoot } from "src/contexts/shared/domain/agregate-root";
import { UserId } from "./user-id";
import { UserFirstName } from "./user-first-name";
import { UserEmail } from "./user-email";

interface UserPrimitives {
    id: string
    firstName: string
    email: string
}

export class User extends AggregateRoot {

    readonly id: UserId
    readonly firstName: UserFirstName
    readonly email: UserEmail

    constructor(
        id: UserId,
        firstName: UserFirstName,
        email: UserEmail
    ) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.email = email;
    }

    toPrimitives(): UserPrimitives {
        return {
            id: this.id.value,
            firstName: this.firstName.value,
            email: this.email.value
        }
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(
            new UserId(primitives.id),
            new UserFirstName(primitives.firstName),
            new UserEmail(primitives.email)
        )
    }

}