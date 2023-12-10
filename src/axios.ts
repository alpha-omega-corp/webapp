import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {$host} from "@/env.d";


const request = (options?: AxiosRequestConfig) => axios.create({
    baseURL: $host,
    
    ...(options ? options : {}),
});

function apiGet<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T, unknown>> {
    return request(options).get<T>(url)
}

function apiPost<T>(url: string, data: object, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).post<T>(url, data)
}

function apiDelete<T>(url: string, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).delete<T>(url, options)
}

function apiPostFormData<T>(url: string, data: FormData, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request({
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        ...(options ? options : {}),
    }).post<T>(url, data)
}

export {apiGet, apiPost, apiDelete, apiPostFormData}

