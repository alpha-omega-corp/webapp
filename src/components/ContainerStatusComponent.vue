<script lang="ts" setup>

const props = defineProps<{
  state: string
  status: string
}>()

const isRunning = (state: string) => {
  return state === 'running'
}

</script>


<template>

    <span
        :class="[isRunning(state) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
        class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-green-700 bg-green-100">
    <svg class="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
      <circle cx="3" cy="3" r="3"/>
    </svg>
    {{ status }}
  </span>


</template>