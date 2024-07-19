<script lang="ts" setup>
import {ActionType} from "@enums/action";
import ButtonComponent from "@components/ButtonComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import {ref} from "vue";
import {apiPost} from "@/http";
import {StatusResponse} from "@models/response";
import InputComponent from "@components/InputComponent.vue";
import {AxiosResponse} from "axios";
import {NotificationType} from "@enums/notification";
import {useNotificationStore} from "@stores/notification";

const createUserModal = ref<boolean>(false)
const name = ref<string>('')
const email = ref<string>('')

const $notification = useNotificationStore()
const emit = defineEmits([
  'refresh'
])

const createUser = () => {
  apiPost<StatusResponse>('/user', {
    name: name.value,
    email: email.value
  })
      .then((res: AxiosResponse<StatusResponse>) => {
        createUserModal.value = false
        $notification.dispatch(NotificationType.SUCCESS, res.status).then(() => emit('refresh'))
      })
      .catch((err) => {
        console.log(err)
      })
}

</script>

<template>
  <ButtonComponent
      text="Create User"
      :action="ActionType.CREATE"
      @click="createUserModal = true"
      :background="true"
  />

  <ModalComponent
      title="Create User"
      :modal="ActionType.CREATE"
      :show="createUserModal"
      @close="createUserModal = false"
      @submit="createUser"
  >

    <InputComponent
        label="Name"
        type="text"
        v-model:value="name"/>

    <InputComponent
        label="Email"
        type="email"
        v-model:value="email"/>

  </ModalComponent>

</template>