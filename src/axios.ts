import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {$host, environment} from "@/env.d";
import {env} from "@headlessui/vue/dist/utils/env";


const request = (options?: AxiosRequestConfig) => axios.create({
    baseURL: $host,
    headers: (sessionStorage.getItem('token') ? { Authorization: `Bearer ${sessionStorage.getItem('token')}` } : {}),
    ...(options ? options : {}),
});

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
    return request({
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        ...(options ? options : {}),
    }).post<T>(url, data)
}

function proxy(url: string): string {
    return `${environment.VITE_PROXY_TARGET}${url}`
}

export {apiGet, apiPost, apiDelete, apiPostFormData}

