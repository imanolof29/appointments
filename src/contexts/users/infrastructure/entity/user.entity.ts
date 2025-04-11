import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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