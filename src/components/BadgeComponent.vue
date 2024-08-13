<script lang="ts" setup>
defineProps<{
  content: string
}>()
</script>


<template>
  <span class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{{ content }}</span>
</template>