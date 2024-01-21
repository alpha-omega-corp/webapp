<script lang="ts" setup>

import {useUserStore} from "@stores/user";
import {useRouter} from "vue-router";

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.commit('logout')
  router.push('/login')
}

</script>

<template>
  <button @click="logout()">
    Logout
  </button>
</template>
