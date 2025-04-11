import { Business } from "../../domain/business.entity";
import { BusinessEntity } from "../entity/business.entity";

export class BusinessMapper {
    static toDomain(businessEntity: BusinessEntity): Business {
        return Business.fromPrimitives({
            id: businessEntity.id,
            name: businessEntity.name,
            email: businessEntity.email
        })
    }

    static toPersistence(business: Business): BusinessEntity {
        const entity = new BusinessEntity();
        entity.id = business.id.value;
        entity.name = business.name.value;
        entity.email = business.email.value;
        return entity;
    }
}