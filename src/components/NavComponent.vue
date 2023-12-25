<script lang="ts" setup>

import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {Bars3Icon, XMarkIcon} from "@heroicons/vue/24/outline";
import {ref} from 'vue';

const props = defineProps(['routes', 'title'])
const sideBarOpen = ref<boolean>(false)

</script>

<template>
  <div>
    <TransitionRoot :show="sideBarOpen" as="template">
      <Dialog as="div" class="relative z-50" @close="sideBarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                         enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100"
                         leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80"/>
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                           enter-from="-translate-x-full" enter-to="translate-x-0"
                           leave="transition ease-in-out duration-300 transform"
                           leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                               enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                               leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button class="-m-2.5 p-2.5" type="button" @click="sideBarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" class="h-6 w-6 text-white"/>
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">

                <slot name="header"></slot>

                <nav class="flex flex-1 flex-col">
                  <ul class="flex flex-1 flex-col gap-y-7" role="list">
                    <li>
                      <ul class="-mx-2 space-y-1" role="list">
                        <li v-for="route in props.routes" :key="route.path">
                          <router-link v-if="route.display" v-can="route.service + '.read'"
                                       :class="['text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
                                       :to="route.path" @click="sideBarOpen = false">

                            <component :is="route.icon"
                                       :class="['text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                                       aria-hidden="true"/>

                            {{ route.name }}

                          </router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6">
      <button class="-m-2.5 p-2.5 text-gray-700" type="button" @click="sideBarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" class="h-6 w-6"/>
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">{{ title }}</div>

      <slot name="profile"></slot>
    </div>


    <slot name="main"></slot>
  </div>

</template>

<style scoped></style>
