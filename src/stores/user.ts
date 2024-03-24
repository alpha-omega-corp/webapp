import {createStore, Store, useStore as baseUseStore} from 'vuex'
import {apiGet} from "@/http";

import {InjectionKey} from 'vue'
import {AxiosResponse} from "axios";
import {Authentication} from "@/models/authentication";
import {GetPermMatrixResponse} from "@/models/response";
import {UserState} from "@models/user";


export const userKey: InjectionKey<Store<UserState>> = Symbol()

export const user: Store<UserState> = createStore<UserState>({
    state: {
        jwt: sessionStorage.getItem('token')
    },
    mutations: {
        login(state: UserState, auth: Authentication): void {
            state.jwt = auth.token
            apiGet<GetPermMatrixResponse>(`/user/${auth.user.id}/permissions`)
                .then((permRes: AxiosResponse<GetPermMatrixResponse>) => {
                    createSession(auth, permRes.data.matrix)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        logout(state: UserState): void {
            deleteSession(state)
        },
    }
})

export const createSession = (auth: Authentication, permMatrix: object): void => {
    let d: Date = new Date();
    d.setTime((d.getTime() + 1) * 24 * 60 * 60 * 1000);
    let expires: string = "expires=" + d.toUTCString();

    document.cookie = "ALPHOMEGA=" + auth.token + ";" + expires + ";path=/" + ";SameSite=None;Secure";
    sessionStorage.setItem('user', JSON.stringify(auth.user))
    sessionStorage.setItem('permissions', JSON.stringify(permMatrix))
    sessionStorage.setItem('token', auth.token)
}

const deleteSession = (state: UserState): void => {
    state.jwt = null
    document.cookie = encodeURIComponent('JWT-TOKEN') +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        ";SameSite=None;secure"
    sessionStorage.clear()
}

export function useUserStore(): Store<UserState> {
    return baseUseStore(userKey)
}
