import {User} from "@assets/models/permissions";

interface Authentication {
    token: string
    user: User
}

export type {Authentication}