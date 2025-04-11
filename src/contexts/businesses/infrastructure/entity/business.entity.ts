import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'businesses' })
export class BusinessEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    name: string

}