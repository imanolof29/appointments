import { BusinessEntity } from "src/contexts/businesses/infrastructure/entity/business.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    USER = 'user',
    BUSINESS = 'business',
    ADMIN = 'admin',
}

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    password: string

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role


    @ManyToOne(() => BusinessEntity, (business) => business.id, { nullable: true })
    business: BusinessEntity

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    verificationToken?: string;

    @Column({ default: true })
    active: boolean;

    @Column({ type: 'timestamp', nullable: true })
    verificationTokenExpires?: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}