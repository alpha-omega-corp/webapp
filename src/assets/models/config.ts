interface Secret {
    name: string
    createdAt: string
    updatedAt: string
    visibility: boolean
}

interface GetSecretsResponse {
    secrets: Secret[]
}

interface GetSecretContentResponse {
    content: string
}

export type { Secret, GetSecretsResponse, GetSecretContentResponse }
