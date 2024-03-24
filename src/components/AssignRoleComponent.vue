<script lang="ts" setup>

import RolesDropdownComponent from "@components/RolesDropdownComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import UsersDropdownComponent from "@components/UsersDropdownComponent.vue";
import {ref} from "vue";
import {Role} from "@/models/permissions";
import {apiPost} from "@/http";
import {AcademicCapIcon} from "@heroicons/vue/20/solid";
import {User} from "@models/user";

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


    <div>
      <ButtonComponent
          class="btn-light-purple"
          text="Assign"
          @click="assignRole">
        <AcademicCapIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
      </ButtonComponent>
    </div>

  </div>
</template>