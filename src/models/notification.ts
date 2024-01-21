interface Notification {
    status: string,
    message: string,
}

interface NotificationState {
    items: Notification[]
}

export type {Notification, NotificationState}