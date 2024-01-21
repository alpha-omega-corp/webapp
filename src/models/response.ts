import {User} from "@models/user";

interface StatusResponse {
    status: number
}

interface GetUsersResponse {
    users: User[];
}


export type {StatusResponse, GetUsersResponse}