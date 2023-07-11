/// <reference types="vite/client" />

import axios, { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Environment } from "@assets/models/environment";
import {User} from "@assets/models/user";
import {ref} from "vue";
import {Authentication} from "@assets/models/authentication";
import {Router, useRouter} from "vue-router";

export const environment: Environment = import.meta.env

export const request = (options?: AxiosRequestConfig) => axios.create({
    baseURL: reqUrl,

    ...(options ? options : {}),
});

export const get = (path: string, options?: AxiosRequestConfig) => {
    return request(options).get(path)
}

export const post = (path: string, data: object) => {
    return request().post(path, data)
}

export const postFormData = (path: string, data: FormData) => {
    return request({
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).post(path, data)
}

export const debounce = (closure: CallableFunction, debounceTime: number) => {
    let timer = 0;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        const context = this;
        timer = setTimeout(() => {
            closure.apply(context, args);
        }, debounceTime);
    }
}

export const userGuard = (): void => {
    const jwtToken = getCookies()['JWT-TOKEN']
    if (!sessionStorage.getItem('user') && jwtToken) {
        get('/api/user', {
            headers: {
                "x-jwt-token": jwtToken
            }
        }).then((res: AxiosResponse<User>): User => {
            sessionStorage.setItem('user', JSON.stringify(res.data))
        })

    }
}

export const getCookies = () => {
    const documentCookies = Object.create({})
    document.cookie.split(";").forEach((v: string): void => {
        const cSplit: string[] = v.split("=")
        documentCookies[cSplit[0].trim()] = cSplit[1].trim()
    })

    return documentCookies
}

export const setSession = (data: Authentication): void => {
    let d: Date = new Date();
    d.setTime((d.getTime() + 1) * 24 * 60 * 60 * 1000);
    let expires: string = "expires=" + d.toUTCString();
    document.cookie = "JWT-TOKEN=" + data.token + ";" + expires + ";path=/" + ";SameSite=None;Secure";
    sessionStorage.setItem("user", JSON.stringify(data.user))
}

export const deleteSession = (): void => {
    document.cookie = encodeURIComponent('JWT-TOKEN') +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        ";SameSite=None;secure"
}

export const appTitle: string = environment.VITE_APP_TITLE
export const reqUrl: string = environment.VITE_REQ_URL
