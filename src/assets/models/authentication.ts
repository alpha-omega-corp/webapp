import {User} from "@assets/models/user";

interface Authentication {
    user: User
    token: string
}

export type {Authentication}