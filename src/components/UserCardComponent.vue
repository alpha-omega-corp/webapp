<script lang="ts" setup>
import {User} from "@models/user";
import RoleBadgeComponent from "@components/RoleBadgeComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import {ActionType} from "@enums/action";

defineEmits([
  'delete:user',
  'update:user',
  'revoke:role'
])

defineProps<{
  user: User
}>()

</script>

<template>
  <div class="flex w-full items-center justify-between space-x-6 p-6">
    <div class="flex-1 truncate">
      <div class="flex items-center space-x-3">
        <h3 class="truncate text-sm font-medium text-gray-900">{{ user.name }}</h3>

      </div>
      <p class="mt-1 truncate text-sm text-gray-500">{{ user.email }}</p>
    </div>

    <div class="flex gap-4">
      <ButtonComponent
          :action="ActionType.DELETE"
          :background="false"
          @click="$emit('delete:user', user)"
      />

      <ButtonComponent
          :action="ActionType.UPDATE"
          :background="false"
          @click="$emit('update:user', user)"
      />

    </div>
  </div>


  <div>
    <div class="-mt-px flex divide-x divide-gray-200 overflow-y-scroll">
      <div class="flex justify-between gap-2 w-0 flex-1 p-6">
        <div class="flex gap-2">
          <template v-for="role in user.roles">

            <RoleBadgeComponent :role="role.name"/>

          </template>
        </div>

        <ButtonComponent
            :action="ActionType.UPDATE"
            :background="false"
            @click="$emit('revoke:role', user)"
        />
      </div>
    </div>
  </div>
</template>