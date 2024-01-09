<script lang="ts" setup>
defineProps<{
  text: string
}>()

</script>

<template>
  <button type="button" :class="$attrs.class" class="flex gap-2">
    <slot></slot>
    <span>{{ text }}</span>
  </button>
</template>