import { forwardRef, Module } from '@nestjs/common';
import { FindUserByIdController } from './http/find-by-id/find-user-by-id.controller';
import { FindUsersController } from './http/find/find-users.controller';
import { UserRepository } from '../domain/user.repository';
import { UserRepositoryOrm } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { FindByIdUserUseCase } from '../application/find-by-id/find-by-id';
import { FindByEmailUserUseCase } from '../application/find-by-email/find-by-email';
import { FindUsersUseCase } from '../application/find/find';
import { SaveUserUseCase } from '../application/save/save';
import { SaveUserController } from './http/save/save-user.controller';
import { SharedModule } from 'src/contexts/shared/infrastructure/shared.module';
import { ActivateUserUseCase } from '../application/activate/activate-user';
import { InactivateUserUseCase } from '../application/inactivate/inactivate-user';
import { ActivateUserController } from './http/activate/activate-user.controller';
import { InactivateUserController } from './http/inactivate/inactivate-user.controller';

@Module({
    imports: [forwardRef(() => SharedModule), TypeOrmModule.forFeature([UserEntity])],
    controllers: [
        FindUserByIdController,
        FindUsersController,
        SaveUserController,
        ActivateUserController,
        InactivateUserController
    ],
    providers: [
        FindByIdUserUseCase,
        FindByEmailUserUseCase,
        FindUsersUseCase,
        SaveUserUseCase,
        ActivateUserUseCase,
        InactivateUserUseCase,
        {
            provide: UserRepository,
            useClass: UserRepositoryOrm
        }
    ],
    exports: [UserRepository]
})
export class UsersModule { }
