<script lang="ts" setup>
const props = defineProps([
  'value',
  'type',
  'label',
  'hint',
  'id',
  'placeholder',
  'aria'
])

defineEmits(['update:value'])

</script>

<template>

  <div class="m-2">
    <label class="block text-sm font-medium leading-6 text-gray-900" for="email">
      {{ label }}
    </label>
    <div class="mt-2">
      <input
          :id="id"
          :aria-describedby="aria"
          :placeholder="placeholder"
          :type="type"
          :value="props.value"
          class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          @input="$emit('update:value', ($event.target as HTMLInputElement).value)"/>
    </div>
    <p id="email-description" class="mt-2 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>