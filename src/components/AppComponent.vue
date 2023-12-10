<script lang="ts" setup>
import {$title} from "@/env.d";
import {routes} from "@/router";

import NavComponent from "@Components/NavComponent.vue"
import ProfileComponent from "@Components/ProfileComponent.vue";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

</script>

<template>
  <NavComponent :routes="routes" title="ALPHOMEGA">
    <template #header>
      <div class="flex justify-center mt-10 border-b border-b-amber-600 pb-4">
        <img :alt="$title" class="nav-logo" src="../assets/images/alphomega.png"/>
      </div>
    </template>

    <template #profile>
      <ProfileComponent v-if="userStore.state.jwtToken"/>
      <div v-if="!userStore.state.jwtToken">
        <router-link to="/login" class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
          <span class="sr-only">Login</span>
          Login
        </router-link>
      </div>
    </template>

    <template #main>
      <main>
        <div class="m-20">
          <router-view/>
        </div>
      </main>
    </template>
  </NavComponent>


</template>

<style scoped>
.nav-logo {
  width: 100px;
}
</style>
