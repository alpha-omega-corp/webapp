/// <reference types="vite/client" />

import {Environment} from "@assets/models/environment";

function getCookies() {
    const documentCookies = Object.create({})
    if (!document.cookie) return documentCookies
    
    document.cookie.split(";").forEach((v: string): void => {
        const cSplit: string[] = v.split("=")
        documentCookies[cSplit[0] ?? cSplit[0].trim()] = cSplit[1] ?? cSplit[1].trim()
    })

    return documentCookies
}

export const environment: Environment = import.meta.env

export const $cookies = getCookies()
export const $userToken: string | null = $cookies['JWT-TOKEN']
export const $title: string = environment.VITE_APP_TITLE
export const $host: string = environment.VITE_REQ_URL