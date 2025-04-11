import { AggregateRoot } from "src/contexts/shared/domain/agregate-root";
import { UserId } from "./user-id";
import { UserFirstName } from "./user-first-name";
import { UserEmail } from "./user-email";
import { UserLastName } from "./user-last-name";
import { UserVerificationStatus } from "./user-verification-status";
import { UserVerificationToken } from "./user-verification-token";

export interface UserPrimitives {
    id: string
    firstName: string
    lastName: string
    email: string
    verificationStatus: boolean
    verificationToken?: string
}

export class User extends AggregateRoot {

    readonly id: UserId
    readonly firstName: UserFirstName
    readonly lastName: UserLastName
    readonly email: UserEmail
    readonly verificationStatus: UserVerificationStatus
    readonly verificationToken?: UserVerificationToken

    constructor(
        id: UserId,
        firstName: UserFirstName,
        lastName: UserLastName,
        email: UserEmail,
        verificationStatus: UserVerificationStatus,
        verificationToken?: UserVerificationToken
    ) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.verificationStatus = verificationStatus;
        this.verificationToken = verificationToken;
    }

    static create(data: {
        firstName: string
        lastName: string
        email: string
        verificationStatus: boolean
        verificationToken?: string
    }): User {
        return new User(
            UserId.random(),
            new UserFirstName(data.firstName),
            new UserLastName(data.lastName),
            new UserEmail(data.email),
            new UserVerificationStatus(data.verificationStatus),
            data.verificationToken ? new UserVerificationToken(data.verificationToken) : undefined
        )
    }

    toPrimitives(): UserPrimitives {
        return {
            id: this.id.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            verificationStatus: this.verificationStatus.value,
            verificationToken: this.verificationToken ? this.verificationToken.value : undefined
        }
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(
            new UserId(primitives.id),
            new UserFirstName(primitives.firstName),
            new UserLastName(primitives.lastName),
            new UserEmail(primitives.email),
            new UserVerificationStatus(primitives.verificationStatus),
            primitives.verificationToken ? new UserVerificationToken(primitives.verificationToken) : undefined
        )
    }

}