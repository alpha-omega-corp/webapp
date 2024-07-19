<script lang="ts" setup>

import RoleBadgeComponent from "@components/RoleBadgeComponent.vue";
import {ref} from "vue";

const selectedItems = ref<string[]>([])

defineEmits(['change'])
const props = defineProps<{
  name: string
  items: any[]
  selected: any[]
}>()

selectedItems.value = props.selected

</script>

<template>
  <fieldset>
    <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
      <div v-for="(item, idx) in items" :key="idx" class="relative flex items-start py-4">
        <div class="min-w-0 flex-1 text-sm leading-6">
          <label :for="`${name}-${item['id']}`" class="select-none font-medium text-gray-900">
            <RoleBadgeComponent :role="item['name']"/>
          </label>
        </div>
        <div class="ml-3 flex h-6 items-center">
          <input :id="`${name}-${item['id']}`"
                 :checked="selected.filter((d) => d.id === item.id).length > 0"
                 v-model="selectedItems"
                 :value="item['id']"
                 @change="() => $emit('change', selectedItems)"
                 class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                 :name="`${name}[]`"
                 type="checkbox"
          />
        </div>
      </div>
    </div>
  </fieldset>
</template>