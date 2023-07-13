import {InjectionKey} from 'vue'
import {createStore, Store, useStore as baseUseStore} from 'vuex'
import {$userToken} from "@/env.d";
import {Authentication} from "@assets/models/authentication";

export interface State {
    jwtToken: string | null
}

export const userKey: InjectionKey<Store<State>> = Symbol()

const createSession = (data: Authentication): void => {
    let d: Date = new Date();
    d.setTime((d.getTime() + 1) * 24 * 60 * 60 * 1000);
    let expires: string = "expires=" + d.toUTCString();
    document.cookie = "JWT-TOKEN=" + data.token + ";" + expires + ";path=/" + ";SameSite=None;Secure";
    sessionStorage.setItem("user", JSON.stringify(data.user))
}

const deleteSession = (): void => {
    document.cookie = encodeURIComponent('JWT-TOKEN') +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        ";SameSite=None;secure"
    sessionStorage.clear()
}

export const userStore: Store<State> = createStore<State>({
    state: {
        jwtToken: $userToken
    },
    mutations: {
        login(state: State, auth: Authentication): void {
            createSession(auth)
            state.jwtToken = auth.token
        },
        logout(state: State): void {
            deleteSession()
            state.jwtToken = null
        }
    }
})

export function useUserStore(): Store<State> {
    return baseUseStore(userKey)
}
