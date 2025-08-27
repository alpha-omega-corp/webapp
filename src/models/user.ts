import {Role} from "@models/permissions";

interface User {
    id: number;
    email: string;
    name: string;
    roles: Role[];
}


interface UserState {
    jwt: string | null
    user: User | null
}

interface UserMachine {
    id: number;
    name: string;
}

export type {User, UserState, UserMachine};