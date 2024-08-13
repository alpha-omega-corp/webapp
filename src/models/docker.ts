interface BuildImageResponse {
    id: string;
}

interface GetImageResponse {
    status: number
    dockerfile: string
    image: DockerImage
}

interface DockerImage {
    id: string;
    tags: string[];
    size: number;
    created: number;
}

export type { BuildImageResponse, DockerImage, GetImageResponse };