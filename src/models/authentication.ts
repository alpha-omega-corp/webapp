import {User} from "@models/user";
import {Response} from "@models/response";

interface Authentication extends Response {
    token: string
    user: User
}

export type {Authentication}