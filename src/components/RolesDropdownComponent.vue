<script lang="ts" setup>
import {ref} from 'vue'
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/vue/20/solid'
import {apiGet} from "@/http";
import {Role} from "@/models/permissions";
import {AxiosResponse} from "axios";
import {GetRolesResponse} from "@models/response";
import SelectComponent from "@components/SelectComponent.vue";

defineEmits(['selected'])

const roles = ref<Role[]>([])

apiGet<GetRolesResponse>('/roles')
    .then((res: AxiosResponse<GetRolesResponse>) => {
      roles.value = res.data.roles
    })
    .catch((err) => {
      console.log(err)
    })


</script>

<template>
  <SelectComponent
      label="role"
      :items="roles"
      @selected="$emit('selected', $event)"
  />
</template>
