<script lang="ts" setup>

import RolesDropdownComponent from "@Components/RolesDropdownComponent.vue";
import {AcademicCapIcon} from "@heroicons/vue/20/solid";
import ButtonComponent from "@Components/ButtonComponent.vue";
import UsersDropdownComponent from "@Components/UsersDropdownComponent.vue";
import {ref} from "vue";
import {Role, User} from "@assets/models/permissions";
import {apiPost} from "@/axios";

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
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
}

</script>

<template>
  <div class="flex justify-start gap-4">

    <div class="w-2/5">
      <RolesDropdownComponent @selected="selectRole"/>
    </div>

    <div class="w-2/5">
      <UsersDropdownComponent @selected="selectUser"/>
    </div>


      <ButtonComponent
          button-text="Assign"
          @click="assignRole">
        <AcademicCapIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
      </ButtonComponent>

  </div>
</template>