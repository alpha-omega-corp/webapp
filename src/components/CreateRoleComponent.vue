<script lang="ts" setup>
import {apiPost} from "@/http";
import {ref} from "vue";
import {PlusCircleIcon} from "@heroicons/vue/20/solid";
import ButtonComponent from "@components/ButtonComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import {ModalType} from "@enums/modal";

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
    <PlusCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
  </ButtonComponent>

  <ModalComponent
      :modal="ModalType.CREATE"
      :show="createRoleModal"
      @close="createRoleModal = false"
      @submit="createRole">

    <InputComponent v-model:value="roleName" placeholder="Role Name"/>

  </ModalComponent>
</template>