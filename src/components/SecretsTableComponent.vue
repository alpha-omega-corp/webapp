<script lang="ts" setup>

import {Secret} from "@/models/config";
import ButtonComponent from "@components/ButtonComponent.vue";
import {ArrowPathRoundedSquareIcon, EyeDropperIcon, PlusCircleIcon, TrashIcon} from "@heroicons/vue/20/solid";

defineEmits([
  'create:secret',
  'delete:secret',
  'sync:environment',
  'edit:secret'
])

defineProps<{
  secrets: Secret[]
}>()


</script>

<template>
  <div class="flex gap-x-2">
    <ButtonComponent
        class="btn-light-purple"
        text="New Secret"
        @click="$emit('create:secret')">
      <PlusCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
    </ButtonComponent>

    <ButtonComponent
        class="btn-light-green"
        text="Sync Environment"
        @click="$emit('sync:environment')">
      <ArrowPathRoundedSquareIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
    </ButtonComponent>


  </div>

  <div>
    <slot name="search"></slot>
  </div>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0" scope="col">Name</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Created At</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Updated At</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Visibility</th>
              <th class="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="secret in secrets" :key="secret.name">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{
                  secret.name
                }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ secret.createdAt }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ secret.updatedAt }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ secret.visibility }}</td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">

                <div class="flex gap-x-2">
                  <ButtonComponent
                      class="btn-light-red"
                      text="Delete"
                      @click="$emit('delete:secret', secret)">
                    <TrashIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
                  </ButtonComponent>

                  <ButtonComponent
                      class="btn-light-cyan"
                      text="Edit"
                      @click="$emit('edit:secret', secret)">
                    <EyeDropperIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
                  </ButtonComponent>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>