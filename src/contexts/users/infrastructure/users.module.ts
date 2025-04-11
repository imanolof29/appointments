import { Module } from '@nestjs/common';
import { FindUserByIdController } from './http/find-by-id/find-user-by-id.controller';
import { FindUsersController } from './http/find/find-users.controller';
import { UserRepository } from '../domain/user.repository';
import { UserRepositoryOrm } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { FindByIdUserUseCase } from '../application/find-by-id/find-by-id';
import { FindByEmailUserUseCase } from '../application/find-by-email/find-by-email';
import { FindUsersUseCase } from '../application/find/find';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [
        FindUserByIdController,
        FindUsersController
    ],
    providers: [
        FindByIdUserUseCase,
        FindByEmailUserUseCase,
        FindUsersUseCase,
        {
            provide: UserRepository,
            useClass: UserRepositoryOrm
        }
    ],
})
export class UsersModule { }
