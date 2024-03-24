<script lang="ts" setup>
import {ref} from 'vue'
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/vue/20/solid'
import {apiGet} from "@/http";
import {Role} from "@/models/permissions";
import {AxiosResponse} from "axios";
import {GetRolesResponse} from "@models/response";

defineEmits(['selected'])

const roles = ref<Role[]>([])
const selectedRole = ref<Role>()
apiGet<GetRolesResponse>('/roles')
    .then((res: AxiosResponse<GetRolesResponse>) => {
      roles.value = res.data.roles
      selectedRole.value = {name: 'Unknown'} as Role
    })
    .catch((err) => {
      console.log(err)
    })


</script>

<template>
  <Listbox v-model="selectedRole" as="div" @update:model-value="(value: Role) => $emit('selected', value)">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      Roles
    </ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <span class="block truncate">{{ selectedRole?.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400"/>
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
        <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption v-for="role in roles" :key="role.name" v-slot="{ active, selected }" :value="role"
                         as="template">
            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ role.name }}</span>

              <span v-if="selected"
                    :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                <CheckIcon aria-hidden="true" class="h-5 w-5"/>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
