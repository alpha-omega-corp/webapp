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
    <div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 mb-3">
      <label :for="label" class="block text-xs font-medium text-gray-900">{{ label }}</label>
      <input
          :id="label"
          :aria-describedby="aria"
          placeholder="..."
          :type="type"
          :value="props.value"
          class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
          @input="$emit('update:value', ($event.target as HTMLInputElement).value)"/>
    </div>



  </template>
