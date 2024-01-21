import {User} from "@/models/permissions";

interface Authentication {
    token: string
    user: User
}

export type {Authentication}