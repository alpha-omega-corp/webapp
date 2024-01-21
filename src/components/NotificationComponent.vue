<script lang="ts" setup>

import {useNotificationStore} from "@stores/notification";
import {ref} from "vue";
import {Store} from "vuex";
import {Notification, NotificationState} from "@models/notification";
import {NotificationType} from "@enums/notification";

import {CheckCircleIcon, XMarkIcon} from "@heroicons/vue/24/solid";

const store = ref<Store<NotificationState>>(useNotificationStore())
const items = ref<Notification[]>([])

store.value.watch(
    (state) => {
      items.value = state.items
      return state.items.length
    },
    () => openNotification()
)

const openNotification = () => {
  for (let i = 0; i < items.value.length; i++) {
    setTimeout(() => {
      store.value.commit('remove', items.value[i])
    }, 4000 * (i + 1))
  }
}
</script>

<template>
  <div aria-live="assertive"
       class="pointer-events-none absolute bottom-0 inset-0 flex px-4 py-6 sm:items-end sm:p-6">
    <div class="flex w-full flex-col items-end space-y-4 sm:items-end">

      <template v-for="item in items">
        <transition enter-active-class="transform ease-out duration-300 transition"
                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
          <div
              class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <span v-if="item.status === NotificationType.SUCCESS">
                    <CheckCircleIcon aria-hidden="true" class="h-6 w-6 text-green-400"/>
                  </span>
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">{{ item.status }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ item.message }}</p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="button"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" class="h-5 w-5"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>
