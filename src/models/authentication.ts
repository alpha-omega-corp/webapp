import {User} from "@models/user";

interface Authentication {
    token: string
    user: User
}

export type {Authentication}