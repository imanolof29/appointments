import { AggregateRoot } from "src/contexts/shared/domain/agregate-root";
import { UserId } from "./user-id";
import { UserFirstName } from "./user-first-name";
import { UserEmail } from "./user-email";
import { UserLastName } from "./user-last-name";
import { UserVerificationStatus } from "./user-verification-status";
import { UserVerificationToken } from "./user-verification-token";
import { UserVerificationTokenExpiresAt } from "./user-verification-token-expires-at";

export interface UserPrimitives {
    id: string
    firstName: string
    lastName: string
    email: string
    verificationStatus: boolean
    verificationToken?: string
    verificationTokenExpiresAt?: Date
}

export class User extends AggregateRoot {

    readonly id: UserId
    readonly firstName: UserFirstName
    readonly lastName: UserLastName
    readonly email: UserEmail
    readonly verificationStatus: UserVerificationStatus
    readonly verificationToken?: UserVerificationToken
    readonly verificationTokenExpiresAt?: UserVerificationTokenExpiresAt

    constructor(
        id: UserId,
        firstName: UserFirstName,
        lastName: UserLastName,
        email: UserEmail,
        verificationStatus: UserVerificationStatus,
        verificationToken?: UserVerificationToken,
        verificationTokenExpiresAt?: UserVerificationTokenExpiresAt
    ) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.verificationStatus = verificationStatus;
        this.verificationToken = verificationToken;
        this.verificationTokenExpiresAt = verificationTokenExpiresAt
    }

    static create(data: {
        firstName: string
        lastName: string
        email: string
        verificationStatus: boolean
        verificationToken?: string
        verificationTokenExpiresAt?: Date
    }): User {
        return new User(
            UserId.random(),
            new UserFirstName(data.firstName),
            new UserLastName(data.lastName),
            new UserEmail(data.email),
            new UserVerificationStatus(data.verificationStatus),
            data.verificationToken ? new UserVerificationToken(data.verificationToken) : undefined,
            data.verificationTokenExpiresAt ? new UserVerificationTokenExpiresAt(data.verificationTokenExpiresAt) : undefined
        )
    }

    verify(token: string): User | null {
        if (!this.verificationToken || !this.verificationTokenExpiresAt) {
            return null;
        }

        const isMatch = this.verificationToken.value === token;
        const isExpired = this.verificationTokenExpiresAt.isExpired();

        if (isMatch && !isExpired) {
            return new User(
                this.id,
                this.firstName,
                this.lastName,
                this.email,
                UserVerificationStatus.verified(),
                this.verificationToken,
                this.verificationTokenExpiresAt
            );
        }

        return null;
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