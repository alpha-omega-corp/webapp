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
    type: string
    size: number
    name: string
    path: string
    sha: string
    gitUrl: string
    htmlUrl: string
    downloadUrl: string
}

interface Package {
    name: string
    files: PackageFile[]
    containers: Container[]
    versions: PackageVersion[]
}

interface PackageVersion {
    repoName: string
    repoPath: string
    repoSha: string
    repoLink: string
    versionId?: number
    versionSha?: string
    versionLink?: string
    containers: Container[]
    file?: string
}

interface PackageFile {
    name: string
    content: string
}

interface GitPackage {
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

export type {
    Container,
    Package,
    PackageVersion,
    GitPackage,
    SimplePackage,
}

