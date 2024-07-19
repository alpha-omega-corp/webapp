<script lang="ts" setup>

enum RoleEnum {
  Admin = 'admin',
  Moderator = 'moderator',
  Premium = 'premium',
  Guest = 'guest',
  Bot = 'bot'
}

const props = defineProps([
  'role'
])

function hasRole(role: string) {
  return role.toLowerCase() === props.role.toLowerCase()
}
</script>

<template>
  <div>

    <span
        v-show="hasRole(RoleEnum.Admin)"
        class="role-badge bg-red-50 text-red-700 ring-red-600/10">
    Admin
  </span>

    <span
        v-show="hasRole(RoleEnum.Moderator)"
        class="role-badge bg-yellow-50 text-yellow-800 ring-yellow-600/20">
      Moderator
    </span>

    <span
        v-show="hasRole(RoleEnum.Premium)"
        class="role-badge bg-purple-50 text-purple-700 ring-purple-700/10">
      Premium
    </span>

    <span
        v-show="hasRole(RoleEnum.Guest)"
        class="role-badge bg-gray-50  text-gray-600  ring-gray-500/10">
    Guest
  </span>

    <span
        v-show="hasRole(RoleEnum.Bot)"
        class="role-badge bg-blue-50  text-blue-600  ring-blue-500/10">
    Bot
  </span>

  </div>

</template>