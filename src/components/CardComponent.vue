<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    <div class="px-4 py-5 sm:px-6 flex flex-col gap-2">
      <b>{{ title }}</b>

      <small>{{ description }}</small>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
    <div class="px-4 py-4 sm:px-6">
      <slot name="footer"></slot>
    </div>
  </div>
</template>