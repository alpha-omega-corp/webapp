<script setup>
defineProps([
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
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
      {{label}}
    </label>
    <div class="mt-2">
      <input
          :type="type"
          :value="value"
          @input="$emit('update:value', $event.target.value)"
          :id="id"
          :placeholder="placeholder"
          :aria-describedby="aria"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
    <p class="mt-2 text-sm text-gray-500" id="email-description">
      {{hint}}
    </p>
  </div>
</template>