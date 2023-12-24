<script lang="ts" setup>
import {apiPost} from "@/axios";
import ModalComponent from "@Components/ModalComponent.vue";
import {PlusCircleIcon} from "@heroicons/vue/20/solid";
import ButtonComponent from "@Components/ButtonComponent.vue";
import {ref} from "vue";


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
      button-text="Role"
      @click="createRoleModal = true">
    <PlusCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
  </ButtonComponent>

  <ModalComponent
      type="create"
      @submit="createRole"
      :open="createRoleModal"
      @close-modal="createRoleModal = false"
      submitButton="Create"
      title="Create Role">

    <input type="text" v-model="roleName" placeholder="Role Name"
           class="border border-gray-300 rounded-md p-2 w-full">
  </ModalComponent>
</template>