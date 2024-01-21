import {createStore, Store, useStore as baseUseStore} from "vuex";
import {InjectionKey} from "vue";
import {Notification, NotificationState} from "@models/notification";
import {NotificationType} from "@enums/notification";

export const notificationKey: InjectionKey<Store<NotificationState>> = Symbol()

export const notification: Store<NotificationState> = createStore<NotificationState>({
    state: {
        items: [],
    },
    mutations: {
        remove(state: NotificationState, item: Notification): void {
            state.items.splice(state.items.indexOf(item), 1)
        },
        push(state: NotificationState, item: Notification): void {
            state.items.push(item)
        },
    },
    actions: {
        success({commit}, message: string): void {
            commit('push', {
                status: NotificationType.SUCCESS,
                message: message,
            })
        },
        error({commit}, message: string): void {
            commit('push', {
                status: NotificationType.ERROR,
                message: message,
            })
        },
    },
})

export function useNotificationStore(): Store<NotificationState> {
    return baseUseStore(notificationKey)
}