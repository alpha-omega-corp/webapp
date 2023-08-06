interface Environment {
    readonly VITE_APP_TITLE: string
    readonly VITE_API_URL: string
    readonly VITE_REQ_URL: string
    readonly MODE: string
}

export type {Environment}