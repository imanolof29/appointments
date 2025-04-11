export class UserDto {
    id: string
    firstName: string
    lastName: string
    email: string

    static fromPrimitives(properties: {
        id: string
        firstName: string
        lastName: string
        email: string
    }) {
        const dto = new UserDto();
        dto.id = properties.id;
        dto.firstName = properties.firstName;
        dto.lastName = properties.lastName;
        dto.email = properties.email;
        return dto;
    }

}