import {AxiosResponse} from "axios";
import {User} from "@assets/models/user";
import {$userToken} from "@/env.d";
import {apiGet} from "@/axios";

export const userGuard = (): void => {
    if (!sessionStorage.getItem('user') && $userToken) {
        apiGet<User>('/api/user', {
            headers: {
                "x-jwt-token": $userToken
            }
        }).then((res: AxiosResponse<User>): void => {
            sessionStorage.setItem('user', JSON.stringify(res.data))
        })
    }
}