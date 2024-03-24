import {User} from "@models/user";
import {Container, PackageVersion, SimplePackage} from "@models/containers";
import {Permission, Role, Service} from "@models/permissions";
import {Secret} from "@models/config";

interface StatusResponse {
    status: number
}

interface GetUsersResponse {
    users: User[];
}


interface GetContainersResponse {
    containers: Container[]
}

interface GetContainerLogsResponse {
    logs: string
}

interface GetPackagesResponse {
    packages: SimplePackage[]
}

interface GetPackageResponse {
    versions: PackageVersion[]
}

interface GetPackageFileResponse {
    content: string
}

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

interface GetSecretsResponse {
    secrets: Secret[]
}

interface GetSecretContentResponse {
    content: string
}

export type {
    StatusResponse,
    GetUsersResponse,
    GetContainersResponse,
    GetContainerLogsResponse,
    GetPackagesResponse,
    GetPackageResponse,
    GetPackageFileResponse,
    GetRolesResponse,
    GetServicesResponse,
    GetPermissionsResponse,
    GetPermMatrixResponse,
    GetSecretsResponse,
    GetSecretContentResponse
}