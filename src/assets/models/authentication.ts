import {User} from "@assets/models/user";

interface Authentication {
    token: string
    user: User
}

export type {Authentication}