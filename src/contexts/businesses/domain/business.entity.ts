import { AggregateRoot } from "src/contexts/shared/domain/agregate-root";
import { BusinessId } from "./business-id";
import { BusinessEmail } from "./business-email";
import { BusinessName } from "./business-name";

export interface BusinessPrimitives {
    id: string
    name: string
    email: string
}

export class Business extends AggregateRoot {
    readonly id: BusinessId
    readonly name: BusinessName
    readonly email: BusinessEmail

    constructor(
        id: BusinessId,
        name: BusinessName,
        email: BusinessEmail
    ) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
    }


    toPrimitives(): BusinessPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value
        }
    }

    static fromPrimitives(primitives: BusinessPrimitives): Business {
        return new Business(
            new BusinessId(primitives.id),
            new BusinessName(primitives.name),
            new BusinessEmail(primitives.email)
        )
    }

}