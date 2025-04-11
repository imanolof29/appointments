import { User } from "../../domain/user.entity";
import { UserEntity } from "../entity/user.entity";

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        return User.fromPrimitives({
            id: userEntity.id,
            firstName: userEntity.firstName,
            lastName: userEntity.lastName,
            email: userEntity.email,
            password: userEntity.password,
            active: userEntity.active,
            verificationStatus: userEntity.isVerified,
            verificationToken: userEntity.verificationToken,
            verificationTokenExpiresAt: userEntity.verificationTokenExpires,
        })
    }
    static toPersistence(user: User): UserEntity {
        const entity = new UserEntity();
        entity.id = user.id.value;
        entity.firstName = user.firstName.value;
        entity.lastName = user.lastName.value;
        entity.email = user.email.value;
        entity.password = user.password.value;
        entity.active = user.active.value;
        entity.isVerified = user.verificationStatus.value;
        entity.verificationToken = user.verificationToken?.value || null;
        entity.verificationTokenExpires = user.verificationTokenExpiresAt?.value || null;
        return entity;
    }
}