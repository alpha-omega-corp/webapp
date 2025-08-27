<script lang="ts" setup>

import ModalComponent from "@components/ModalComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";

import {PlusCircleIcon} from "@heroicons/vue/20/solid";
import {ref} from "vue";
import {ActionType} from "@enums/action";
import {apiGet, apiPost} from "@/http";
import {UserMachine} from "@models/user";
import {AxiosResponse} from "axios";
import {useUserStore} from "@stores/user";

const $user = useUserStore()

const createMachineModal = ref<boolean>(false);
const createMachineName = ref<string>();

const createMachine = () => {
    apiPost<UserMachine>(`/docker/user/machine`, {
      userId: $user.getters.current.id,
      name: createMachineName.value,
    }).then((res: AxiosResponse<UserMachine>) => {
      console.log(res)
    })
}

const getUserMachines = () => {
  apiGet<UserMachine[]>(`/docker/user/machines`).then((res: AxiosResponse<UserMachine[]>) => {
    console.log(res)
  })
}

</script>

<template>
  <ButtonComponent
      class="btn-primary"
      :text="$t('machine.create')"
      @click="createMachineModal = true">
    <PlusCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
  </ButtonComponent>

  <ModalComponent
      :title="$t('machine.create')"
      :modal="ActionType.CREATE"
      :show="createMachineModal"
      @close="createMachineModal = false"
      @submit="createMachine">

    <InputComponent
        id="name"
        label="Name"
        type="text"
        v-model:value="createMachineName"
    />

  </ModalComponent>
</template>