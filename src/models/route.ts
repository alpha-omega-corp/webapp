import type { Component, FunctionalComponent, HTMLAttributes, VNodeProps } from "vue"

interface Route {
    service: string
    path: string
    component: Component
    name?: string
    display?: boolean
    icon?: FunctionalComponent<HTMLAttributes & VNodeProps> | string
}

export type { Route }

