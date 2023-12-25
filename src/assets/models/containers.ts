interface Container {
    id: string
    image: string
    status: string
    command: string
    created: number
    state: string
    names: string[]
}

interface SimplePackage {
    id: number
    tag: string
    name: string
    synced: boolean
}

interface Package {
    id: number
    tag: string
    name: string
    dockerfile: string
    makefile: string
    synced: boolean
    git: GithubPackage
    imageName: string
}

interface GithubPackage {
    id: number
    name: string
    type: string
    version: number
    visibility: string
    url: string
    htmlUrl: string
    ownerId: string
    ownerName: string
    ownerNode: string
    ownerType: string
}

interface GetContainersResponse {
    containers: Container[]
}

interface GetContainerLogsResponse {
    logs: string
}

interface GetPackagesResponse {
    packages: SimplePackage[]
}

interface GetPackageResponse {
    package: Package
}

export type {
    Container,
    Package,
    GithubPackage,
    SimplePackage,
    GetContainersResponse,
    GetContainerLogsResponse,
    GetPackagesResponse,
    GetPackageResponse,
}