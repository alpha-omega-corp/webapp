<script lang="ts" setup>

defineProps<{
  title: string
}>()
</script>

<template>

  <div class="grid-card">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div class="ml-4 mt-4">
          <h3 class="text-base font-semibold leading-6 text-gray-900">{{ title }}</h3>
        </div>
        <div class="ml-4 mt-4 flex-shrink-0">
          <slot name="action"></slot>
        </div>
      </div>
    </div>

    <div class="grid-card-content">
      <slot></slot>
    </div>

  </div>

</template>

<style scoped>

.grid-card {
  border: 1px solid #ccc;
  border-radius: 10px;
}

.grid-card-content {
  padding: 20px;
}

</style>