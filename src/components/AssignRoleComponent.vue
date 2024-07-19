<script lang="ts" setup>

import RolesDropdownComponent from "@components/RolesDropdownComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import UsersDropdownComponent from "@components/UsersDropdownComponent.vue";
import {ref} from "vue";
import {Role} from "@/models/permissions";
import {apiPost} from "@/http";
import {AcademicCapIcon} from "@heroicons/vue/20/solid";
import {User} from "@models/user";
import {ActionType} from "@enums/action";
import ModalComponent from "@components/ModalComponent.vue";
import {NotificationType} from "@enums/notification";
import {useNotificationStore} from "@stores/notification";

const $notification = useNotificationStore()
const emit = defineEmits([
    'refresh'
])

const assignRoleModal = ref<boolean>(false)
const selectedUser = ref<User>()
const selectedRole = ref<Role>()

const selectUser = (user: User) => selectedUser.value = user
const selectRole = (role: Role) => selectedRole.value = role

const assignRole = () => {
  apiPost('/role/assign', {
    user: selectedUser.value?.id,
    role: selectedRole.value?.id
  })
      .then((res) => {
        assignRoleModal.value = false
        $notification.dispatch(NotificationType.SUCCESS, res.statusText).then(() => emit('refresh'))
      })
      .catch((err) => {
        console.log(err)
      })
}

</script>

<template>

  <ButtonComponent
      text="Assign Role"
      :action="ActionType.CREATE"
      @click="assignRoleModal = true"
  />

  <ModalComponent
      title="Assign Role"
      :modal="ActionType.CREATE"
      :show="assignRoleModal"
      @close="assignRoleModal = false"
      @submit="assignRole">

    <RolesDropdownComponent @selected="selectRole"/>
    <UsersDropdownComponent @selected="selectUser"/>

  </ModalComponent>

</template>