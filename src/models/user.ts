import {Role} from "@models/permissions";

interface User {
    id: number;
    email: string;
    name: string;
    roles: Role[];
}


interface UserState {
    jwt: string | null
}

export type {User, UserState}