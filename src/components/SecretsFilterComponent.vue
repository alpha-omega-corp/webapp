<script lang="ts" setup>

import {VarType} from "@enums/environment";

defineEmits([
  'filter'
])

const varTypes = [
  VarType.ENV,
  VarType.HOST,
  VarType.CONFIG,
  VarType.ALL,
]
</script>


<template>
  <div class="mb-10 pb-4 border-b border-b-gray-500">
    <label class="text-base font-semibold text-gray-900">Variables</label>
    <p class="text-sm text-gray-500">Filter environment variables by type</p>
    <fieldset class="mt-4">
      <legend class="sr-only">Variable type</legend>
      <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
        <div v-for="varType in varTypes" :key="varType" class="flex items-center">

          <input :id="varType" :checked="varType === VarType.ALL"
                 class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                 name="notification-method"
                 type="radio"
                 @click="$emit('filter', varType)"/>

          <label :for="varType" class="ml-3 block text-sm font-medium leading-6 text-gray-900">{{ varType }}</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>
