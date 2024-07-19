<script lang="ts" setup>
import {ref} from 'vue'
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/vue/20/solid'
import {apiGet} from "@/http";
import {Role, Service} from "@/models/permissions";
import {AxiosResponse} from "axios";
import {GetPermissionsResponse, GetServicesResponse} from "@models/response";
import SelectComponent from "@components/SelectComponent.vue";

defineEmits(['selected'])

const services = ref<Service[]>([])

apiGet<GetServicesResponse>('permission/pkg')
  .then((res: AxiosResponse<GetServicesResponse>) => {
    services.value = res.data.services
  })
  .catch((err) => {
    console.log(err)
})

</script>

<template>
  <SelectComponent
      label="service"
      :items="services"
      @selected="$emit('selected', $event)"
  />
</template>