<script lang="ts" setup>
import {routes} from "@router/routes";

import NavComponent from "@components/NavComponent.vue"
import ProfileComponent from "@components/ProfileComponent.vue";
import {useUserStore} from "@stores/user";
import NotificationComponent from "@components/NotificationComponent.vue";
import {$orgName} from "@/env.d";

const userStore = useUserStore()
</script>

<template>
  <NavComponent :routes="routes" title="ALPHOMEGA">
    <template #header>
      <div class="flex justify-center mt-10 border-b border-b-amber-600 pb-4">
        <img :alt="$orgName" class="nav-logo" src="../assets/images/alphomega.png"/>
      </div>
    </template>

    <template #profile>
      <ProfileComponent v-if="userStore.state.jwt"/>
      <div v-if="!userStore.state.jwt">
        <router-link
            class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            to="/login">
          <span class="sr-only">Login</span>
          Login
        </router-link>
      </div>
    </template>

    <template #main>
      <main class="m-10">
        <router-view />

        <NotificationComponent/>
      </main>
    </template>
  </NavComponent>


</template>

<style scoped>
.nav-logo {
  width: 100px;
}
</style>
