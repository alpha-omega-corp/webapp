import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {environment} from "@/env.d";

const request = (options?: AxiosRequestConfig, headers?: object) => {
    const auth = (sessionStorage.getItem('token') ? {Authorization: `Bearer ${sessionStorage.getItem('token')}`} : {})

    return axios.create({
        headers: {
            ...auth,
            ...(headers ? headers : {}),
        },
        ...(options ? options : {}),
    });
}

function apiGet<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T, unknown>> {
    return request(options).get<T>(proxy(url))
}

function apiPost<T>(url: string, data: object, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).post<T>(proxy(url), data)
}

function apiDelete<T>(url: string, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).delete<T>(proxy(url), options)
}

function apiPostFormData<T>(url: string, data: FormData, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options, {
        'Content-Type': 'multipart/form-data',
    }).post<T>(proxy(url), data)
}

function proxy(url: string): string {
    return `${environment.VITE_PROXY}${url}`
}

export {apiGet, apiPost, apiDelete, apiPostFormData}

