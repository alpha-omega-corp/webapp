interface File {
    name: string,
    content: string,
    isOpen: boolean
    isSelected: boolean
}

interface FileState {
    items: File[],
    files: File[]
}

export type {File, FileState }