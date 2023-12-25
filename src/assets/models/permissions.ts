interface GetRolesResponse {
    roles: Role[];
}

interface GetServicesResponse {
    services: Service[];
}

interface GetPermissionsResponse {
    permissions: Permission[];
}

interface GetPermMatrixResponse {
    matrix: object;
}

interface Permission {
    id: number;
    service: Service;
    role: Role;
    canRead: boolean;
    canWrite: boolean;
    canManage: boolean;
}

interface Service {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    active: boolean;
}

interface GetUsersResponse {
    users: User[];
}

interface User {
    id: number;
    email: string;
    name: string;
    roles: Role[];
}



export type {
    Permission,
    Role,
    Service,
    User,
    GetUsersResponse,
    GetRolesResponse,
    GetServicesResponse,
    GetPermissionsResponse,
    GetPermMatrixResponse}