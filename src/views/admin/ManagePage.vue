<script lang="ts" setup>

import UsersTableComponent from "@Components/UsersTableComponent.vue";
import CreatePermissionComponent from "@Components/CreatePermissionComponent.vue";
import CreateRoleComponent from "@Components/CreateRoleComponent.vue";
import AssignRoleComponent from "@Components/AssignRoleComponent.vue";
import PermsTableComponent from "@Components/PermsTableComponent.vue";

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
          <div class="w-full ml-10">
            <AssignRoleComponent/>
          </div>
        </div>

      <div class="mt-10">
        <PermsTableComponent/>
      </div>


      <UsersTableComponent/>

    </div>

    <div class="w-2/5">
      <div class="p-10 pt-0">
      </div>
    </div>

  </div>
</template>