<script lang="ts" setup>
import {  ArrowsRightLeftIcon } from '@heroicons/vue/20/solid'

const props = defineProps([
    'buttonText',
])
</script>

<template>
  <button type="button"
          class="me-2 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <slot></slot>
    {{ props.buttonText }}
  </button>
</template>