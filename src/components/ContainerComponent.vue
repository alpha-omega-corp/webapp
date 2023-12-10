<script lang="ts" setup>
import {Container} from "@assets/models/containers";
import { CalendarDaysIcon, CommandLineIcon, IdentificationIcon } from '@heroicons/vue/24/solid'
import {ref} from "vue";

const props = defineProps(['container'])
const container = ref<Container>(props.container)

const containerCreatedAt = new Date(container.value.created * 1000)
const isRunning = ref(container.value.status === 'running')
</script>

<template>

  <div class="lg:col-start-3 lg:row-end-1 m-10">
    <h2 class="sr-only">Container</h2>
    <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
      <dl class="flex flex-wrap">
        <div class="flex-auto pl-6 pt-6">
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            Container
          </dt>
          <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
            {{container.names[0]}}
          </dd>
        </div>
        <div class="flex-none self-end px-6 pt-4">
          <dt class="sr-only">Status</dt>
          <dd class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset" :class="{'ring-green-600/20': isRunning, 'ring-red-600/20': !isRunning}">
            {{container.status}}
          </dd>
        </div>
        <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
          <dt class="flex-none">
            <span class="sr-only">Identifier</span>
            <IdentificationIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm font-medium leading-6 text-gray-900">
            {{container.id}}
          </dd>
        </div>
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt class="flex-none">
            <span class="sr-only">Created</span>
            <CalendarDaysIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            <time datetime="2023-01-31">
              {{containerCreatedAt.toString().split('GMT')[0]}}
            </time>
          </dd>
        </div>
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt class="flex-none">
            <span class="sr-only">Command</span>
            <CommandLineIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            {{container.command}}
          </dd>
        </div>
      </dl>
      <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
        <router-link
                     :class="['text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
                     :to="'/docker/container/' + container.id + '/logs'">
          <div class="text-sm font-semibold leading-6 text-gray-900">
            Inspect Logs
            <span aria-hidden="true">&rarr;</span>
          </div>

        </router-link>
      </div>
    </div>
  </div>
  <div>


  </div>
</template>