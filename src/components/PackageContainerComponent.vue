<script lang="ts" setup>

import {Container} from "@assets/models/containers";
import ContainerStatusComponent from "@Components/ContainerStatusComponent.vue";
import {TrashIcon} from "@heroicons/vue/20/solid";
import ButtonComponent from "@Components/ButtonComponent.vue";

defineEmits([
  'delete:container'
])
const props = defineProps<{
  container: Container
}>()

</script>

<template>
  <div class="relative">
    <div class="pt-4 pb-2">
      <h3 class="text-base font-semibold leading-7 text-gray-900">{{ container.names }}</h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        {{ container.id }}
      </p>
      <ContainerStatusComponent :state="container.state" :status="container.status"/>

      <router-link v-can="'packages.manage'"
                   :class="['text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
                   :to="'/docker/container/' + container.id + '/logs'">
        <div class="text-sm font-semibold leading-6 text-gray-900">
          Inspect Logs
          <span aria-hidden="true">&rarr;</span>
        </div>

      </router-link>
    </div>


    <div class="absolute top-0 right-0">
      <ButtonComponent
          text="Delete"
          class="btn-light-red"
          @click="$emit('delete:container', container)">
        <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
      </ButtonComponent>
    </div>
  </div>
</template>