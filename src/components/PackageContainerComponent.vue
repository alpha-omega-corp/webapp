<script lang="ts" setup>

import {Container} from "@models/containers";
import {ContainerState} from "@enums/container";
import {ArrowRightCircleIcon, NewspaperIcon, StopCircleIcon, TrashIcon} from "@heroicons/vue/20/solid";
import ContainerStatusComponent from "@components/ContainerStatusComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";


defineEmits([
  'delete:container',
  'start:container',
  'stop:container',
  'get:logs',
])
const props = defineProps<{
  container: Container
}>()
</script>

<template>
  <div class="relative">
    <h3 class="text-base font-semibold leading-7 text-gray-900">{{ container.names }}</h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      {{ container.id }}
    </p>

    <div class="flex justify-between mt-4">
      <div>
        <ContainerStatusComponent :state="container.state" :status="container.status"/>
      </div>

      <div class="flex gap-2">
        <ButtonComponent
            class="btn-light-cyan"
            text="Logs"
            @click="$emit('get:logs', container)">
          <NewspaperIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
        </ButtonComponent>

        <ButtonComponent
            v-if="container.state === ContainerState.DOWN"
            class="btn-light-green"
            text="Start"
            @click="$emit('start:container', container.id)">
          <ArrowRightCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
        </ButtonComponent>

        <ButtonComponent
            v-if="container.state === ContainerState.UP"
            class="btn-light-yellow"
            text="Stop"
            @click="$emit('stop:container', container.id)">
          <StopCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
        </ButtonComponent>

        <ButtonComponent
            class="btn-light-red"
            text="Delete"
            @click="$emit('delete:container', container)">
          <TrashIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>