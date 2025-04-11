import { AggregateRoot } from "src/contexts/shared/domain/agregate-root";
import { UserId } from "./user-id";
import { UserFirstName } from "./user-first-name";
import { UserEmail } from "./user-email";
import { UserLastName } from "./user-last-name";

interface UserPrimitives {
    id: string
    firstName: string
    lastName: string
    email: string
}

export class User extends AggregateRoot {

    readonly id: UserId
    readonly firstName: UserFirstName
    readonly lastName: UserLastName
    readonly email: UserEmail

    constructor(
        id: UserId,
        firstName: UserFirstName,
        lastName: UserLastName,
        email: UserEmail
    ) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    static create(data: {
        firstName: string
        lastName: string
        email: string
    }): User {
        return new User(
            UserId.random(),
            new UserFirstName(data.firstName),
            new UserLastName(data.lastName),
            new UserEmail(data.email)
        )
    }

    toPrimitives(): UserPrimitives {
        return {
            id: this.id.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value
        }
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(
            new UserId(primitives.id),
            new UserFirstName(primitives.firstName),
            new UserLastName(primitives.lastName),
            new UserEmail(primitives.email)
        )
    }

}