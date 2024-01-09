<script lang="ts" setup>
import {apiPost} from "@/axios";
import ModalComponent from "@Components/ModalComponent.vue";
import {PlusCircleIcon} from "@heroicons/vue/20/solid";
import ButtonComponent from "@Components/ButtonComponent.vue";
import {ref} from "vue";
import InputComponent from "@Components/InputComponent.vue";


const createRole = () => {
  apiPost('role', {
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
      class="btn-light-purple"
      text="Role"
      @click="createRoleModal = true">
    <PlusCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
  </ButtonComponent>

  <ModalComponent
      type="create"
      button="Create"
      :open="createRoleModal"
      @close="createRoleModal = false"
      @submit="createRole">

    <InputComponent placeholder="Role Name" v-model:value="roleName"/>

  </ModalComponent>
</template>