import {Role} from "@assets/models/permissions";

interface GetUsersResponse {
    users: User[];
}

interface User {
    id: number;
    email: string;
    name: string;
    roles: Role[];
}

export type {User, GetUsersResponse}