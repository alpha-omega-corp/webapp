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


export type {
    Permission,
    Role,
    Service,
    GetUsersResponse,
    GetRolesResponse,
    GetServicesResponse,
    GetPermissionsResponse,
    GetPermMatrixResponse
}