<script lang="ts" setup>

import {ActionType} from "@enums/action";
import {ref} from "vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import {apiPost} from "@/http";

const createServiceModal = ref<boolean>(false)
const serviceName = ref<string>('')

const createService = () => {
  apiPost('service', {
    name: serviceName.value
  })
      .then((res) => {
        createServiceModal.value = false
      })
      .catch((err) => {
        console.log(err)
      })
}

</script>

<template>
  <ButtonComponent
      text="Create Service"
      :action="ActionType.CREATE"
      @click="createServiceModal = true"
  />

  <ModalComponent
      title="Create Service"
      :modal="ActionType.CREATE"
      :show="createServiceModal"
      @close="createServiceModal = false"
      @submit="createService">

    <InputComponent
        label="Name"
        type="text"
        v-model:value="serviceName"/>

  </ModalComponent>
</template>