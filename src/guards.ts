import {AxiosResponse} from "axios";
import {User} from "@assets/models/user";
import {getCookies} from "@/env.d";
import {apiPost} from "@/axios";

export const userGuard = (): void => {
    const token = getCookies()['JWT-TOKEN']
    if (!sessionStorage.getItem('user') && token) {
        apiPost<User>('/validate', {
            headers: {
                "Authorization": 'Bearer ' + token
            }
        }).then((res: AxiosResponse<User>): void => {
            sessionStorage.setItem('user', JSON.stringify(res.data))
        })
    }
}