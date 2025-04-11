import { User } from "./user.entity";

export abstract class UserRepository {
    abstract findAll(): Promise<User[]>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract save(user: User): Promise<void>;
}