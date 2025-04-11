import { Injectable } from "@nestjs/common";
import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { UserEntity } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserMapper } from "../mapper/user-mapper";

@Injectable()
export class UserRepositoryOrm extends UserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {
        super();
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users.map(UserMapper.toDomain);
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) return null;
        return UserMapper.toDomain(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) return null;
        return UserMapper.toDomain(user);
    }

    async save(user: User): Promise<void> {
        const userEntity = UserMapper.toPersistence(user);
        await this.usersRepository.save(userEntity);
    }

}