import { Business } from "./business.entity";

export abstract class BusinessRepository {
    abstract findAll(): Promise<Business[]>;
    abstract findById(id: string): Promise<Business | null>;
    abstract save(business: any): Promise<Business>;
}