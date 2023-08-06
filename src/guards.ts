import {AxiosResponse} from "axios";
import {User} from "@assets/models/user";
import {$userToken, getCookies} from "@/env.d";
import {apiGet} from "@/axios";

export const userGuard = (): void => {
    if (!sessionStorage.getItem('user') && getCookies()['JWT-TOKEN']) {
        apiGet<User>('/validate', {
            headers: {
                "Authorization": 'Bearer ' + $userToken
            }
        }).then((res: AxiosResponse<User>): void => {
            sessionStorage.setItem('user', JSON.stringify(res.data))
        })
    }
}