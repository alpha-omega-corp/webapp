<script lang="ts" setup>

import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import {apiGet} from "@/axios";
import {AxiosResponse} from "axios";
import {GetUsersResponse, User} from "@assets/models/permissions";

defineEmits(['selected'])

const users = ref<User[]>([])
apiGet<GetUsersResponse>('/users')
    .then((res: AxiosResponse<GetUsersResponse>) => {
      users.value = res.data.users
    })
    .catch((err) => {
      console.log(err)
    })

const query = ref('')
const selectedUser = ref<User>()
const filteredUsers = computed(() =>
    query.value === ''
        ? users.value
        : users.value.filter((user: User) => {
          return user.email.toLowerCase().includes(query.value.toLowerCase())
        })
)

</script>

<template>
  <Combobox as="div" v-model="selectedUser" @update:model-value="(value: User) => $emit('selected', value)">
    <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      Search Users
    </ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxInput
          class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          @change="query = $event.target.value" :display-value="(user) => (user as User).email" />

      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="filteredUsers.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="user in filteredUsers" :key="user.id" :value="user" as="template" v-slot="{ active, selected }">
          <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ user.email }}
            </span>

            <span v-if="selected" :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>



