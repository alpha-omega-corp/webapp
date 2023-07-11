import type { Component, FunctionalComponent, HTMLAttributes, VNodeProps } from "vue"

interface Route {
    name: string;
    path: string;
    component: Component;
    display: boolean,
    icon?: FunctionalComponent<HTMLAttributes & VNodeProps> | string
}

export type { Route }

