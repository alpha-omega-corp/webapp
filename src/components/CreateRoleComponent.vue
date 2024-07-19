<script lang="ts" setup>
import {apiPost} from "@/http";
import {ref} from "vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import {ActionType} from "@enums/action";
import ColorPickerComponent from "@components/ColorPickerComponent.vue";

const createRole = () => {
  apiPost('/role', {
    name: roleName.value
  })
      .then((res) => {
        createRoleModal.value = false
      })
      .catch((err) => {
        console.log(err)
      })
}

const createRoleModal = ref<boolean>(false)
const roleName = ref<string>('')

</script>

<template>
  <ButtonComponent
      text="Create Role"
      :action="ActionType.CREATE"
      @click="createRoleModal = true"
  />

  <ModalComponent
      :modal="ActionType.CREATE"
      :show="createRoleModal"
      title="Create Role"
      @close="createRoleModal = false"
      @submit="createRole">

    <InputComponent
        label="Name"
        type="text"
        v-model:value="roleName" placeholder="Role Name"/>

    <ColorPickerComponent :label="roleName"/>

  </ModalComponent>
</template>