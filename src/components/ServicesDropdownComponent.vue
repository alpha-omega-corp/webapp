<script lang="ts" setup>
import {ref} from 'vue'
import {apiGet} from "@/http";
import {Service} from "@/models/permissions";
import {AxiosResponse} from "axios";
import {GetServicesResponse} from "@models/response";
import SelectComponent from "@components/SelectComponent.vue";

defineEmits(['selected'])

const services = ref<Service[]>([])

apiGet<GetServicesResponse>('/auth/services')
  .then((res: AxiosResponse<GetServicesResponse>) => {
    services.value = res.data.services
    console.log(services.value)
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