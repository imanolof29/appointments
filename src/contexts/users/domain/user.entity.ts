import { AggregateRoot } from "src/contexts/shared/domain/agregate-root";
import { UserId } from "./user-id";
import { UserFirstName } from "./user-first-name";
import { UserEmail } from "./user-email";
import { UserLastName } from "./user-last-name";
import { UserVerificationStatus } from "./user-verification-status";
import { UserVerificationToken } from "./user-verification-token";
import { UserVerificationTokenExpiresAt } from "./user-verification-token-expires-at";
import { UserPassword } from "./user-password";
import { UserStatus } from "./user-status";

export interface UserPrimitives {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    active: boolean
    verificationStatus: boolean
    verificationToken?: string
    verificationTokenExpiresAt?: Date
}

export class User extends AggregateRoot {

    readonly id: UserId
    readonly firstName: UserFirstName
    readonly lastName: UserLastName
    readonly email: UserEmail
    readonly password?: UserPassword
    readonly active: UserStatus
    readonly verificationStatus: UserVerificationStatus
    readonly verificationToken?: UserVerificationToken
    readonly verificationTokenExpiresAt?: UserVerificationTokenExpiresAt

    constructor(
        id: UserId,
        firstName: UserFirstName,
        lastName: UserLastName,
        email: UserEmail,
        password: UserPassword,
        active: UserStatus,
        verificationStatus: UserVerificationStatus,
        verificationToken?: UserVerificationToken,
        verificationTokenExpiresAt?: UserVerificationTokenExpiresAt
    ) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.active = active;
        this.verificationStatus = verificationStatus;
        this.verificationToken = verificationToken;
        this.verificationTokenExpiresAt = verificationTokenExpiresAt
    }

    static create(data: {
        firstName: string
        lastName: string
        email: string
        password: string
        status: boolean
        verificationStatus: boolean
        verificationToken?: string
        verificationTokenExpiresAt?: Date
    }): User {
        return new User(
            UserId.random(),
            new UserFirstName(data.firstName),
            new UserLastName(data.lastName),
            new UserEmail(data.email),
            new UserPassword(data.password),
            new UserStatus(data.status),
            new UserVerificationStatus(data.verificationStatus),
            data.verificationToken ? new UserVerificationToken(data.verificationToken) : undefined,
            data.verificationTokenExpiresAt ? new UserVerificationTokenExpiresAt(data.verificationTokenExpiresAt) : undefined
        )
    }

    static createPendingVerification(data: {
        firstName: string
        lastName: string
        email: string
        password: string
    }): User {
        return new User(
            UserId.random(),
            new UserFirstName(data.firstName),
            new UserLastName(data.lastName),
            new UserEmail(data.email),
            new UserPassword(data.password),
            UserStatus.inactive(),
            UserVerificationStatus.unverified(),
            UserVerificationToken.create(),
            UserVerificationTokenExpiresAt.create()
        )
    }

    renewVerificationToken(): User {
        return new User(
            this.id,
            this.firstName,
            this.lastName,
            this.email,
            this.password,
            this.active,
            this.verificationStatus,
            UserVerificationToken.create(),
            UserVerificationTokenExpiresAt.create()
        );
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
                this.password,
                UserStatus.active(),
                UserVerificationStatus.verified()
            );
        }
        return null;
    }

    activate(): User {
        if (this.activate) return this
        return new User(
            this.id,
            this.firstName,
            this.lastName,
            this.email,
            this.password,
            UserStatus.active(),
            this.verificationStatus
        );
    }

    inactivate(): User {
        if (!this.activate) return this
        return new User(
            this.id,
            this.firstName,
            this.lastName,
            this.email,
            this.password,
            UserStatus.inactive(),
            this.verificationStatus
        );
    }

    toPrimitives(): UserPrimitives {
        return {
            id: this.id.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            password: this.password.value,
            active: this.active.value,
            verificationStatus: this.verificationStatus.value,
            verificationToken: this.verificationToken ? this.verificationToken.value : undefined,
            verificationTokenExpiresAt: this.verificationTokenExpiresAt ? this.verificationTokenExpiresAt.value : undefined
        }
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(
            new UserId(primitives.id),
            new UserFirstName(primitives.firstName),
            new UserLastName(primitives.lastName),
            new UserEmail(primitives.email),
            new UserPassword(primitives.password),
            new UserStatus(primitives.verificationStatus),
            new UserVerificationStatus(primitives.verificationStatus),
            primitives.verificationToken ? new UserVerificationToken(primitives.verificationToken) : undefined,
            primitives.verificationTokenExpiresAt ? new UserVerificationTokenExpiresAt(primitives.verificationTokenExpiresAt) : undefined
        )
    }

}