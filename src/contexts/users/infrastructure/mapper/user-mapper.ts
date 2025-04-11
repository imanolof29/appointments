import { User } from "../../domain/user.entity";
import { UserEntity } from "../entity/user.entity";

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        return User.fromPrimitives({
            id: userEntity.id,
            firstName: userEntity.firstName,
            email: userEntity.email,
        })
    }
    static toPersistence(user: User): UserEntity {
        const entity = new UserEntity();
        entity.id = user.id.value;
        entity.firstName = user.firstName.value;
        entity.email = user.email.value;
        return entity;
    }
}