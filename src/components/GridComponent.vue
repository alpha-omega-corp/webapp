<script lang="ts" setup>

defineProps<{
  columns: string
}>()

</script>

<template>
  <div class="grid grid-cols-1 gap-4" :class="`lg:grid-cols-${columns}`">
    <slot></slot>
  </div>
</template>