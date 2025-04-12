import { UserEntity } from "src/contexts/users/infrastructure/entity/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'businesses' })
export class BusinessEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @OneToMany(() => UserEntity, (user) => user.business)
    users: UserEntity[]

}