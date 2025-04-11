import { Injectable } from "@nestjs/common";
import { BusinessRepository } from "../../domain/business.repository";
import { Business } from "../../domain/business.entity";
import { BusinessEntity } from "../entity/business.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BusinessRepositoryOrm extends BusinessRepository {

    constructor(
        @InjectRepository(BusinessEntity)
        private readonly businessRepository: Repository<BusinessEntity>,
    ) {
        super()
    }

    findAll(): Promise<Business[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Business | null> {
        throw new Error("Method not implemented.");
    }
    save(business: any): Promise<Business> {
        throw new Error("Method not implemented.");
    }

}
