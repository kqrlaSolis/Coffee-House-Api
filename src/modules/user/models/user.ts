export interface User {
    id: number,
    userName: string,
    role: Role,
    createdDate: Date,
    updatedDate: Date,
    isActive: boolean,
}

enum Role {
    CUSTOMER,
    ADMIN,
    BARISTA
}