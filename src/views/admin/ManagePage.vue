<script lang="ts" setup>

import UsersTableComponent from "@Components/UsersTableComponent.vue";
import CreatePermissionComponent from "@Components/CreatePermissionComponent.vue";
import CreateRoleComponent from "@Components/CreateRoleComponent.vue";
import AssignRoleComponent from "@Components/AssignRoleComponent.vue";
import PermsTableComponent from "@Components/PermsTableComponent.vue";
import {apiGet} from "@/axios";
import {User} from "@assets/models/user";


</script>

<template>
  <div class="flex">

    <div class="w-3/5">
        <div class="flex">
          <div>
            <CreateRoleComponent/>
          </div>
          <div>
            <CreatePermissionComponent/>
          </div>
          
          <div class="w-full">
            <PermsTableComponent/>
          </div>
        </div>

      <AssignRoleComponent/>
      <UsersTableComponent/>

    </div>

    <div class="w-2/5">
      <div class="p-10 pt-0">
      </div>
    </div>

  </div>
</template>