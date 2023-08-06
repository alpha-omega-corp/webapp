<script lang="ts" setup>
import {$title} from "@/env.d";
import {routes} from "@/router";

import NavComponent from "@Components/NavComponent.vue"
import ProfileComponent from "@Components/ProfileComponent.vue";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

</script>

<template>
  <NavComponent :routes="routes" title="ChadGpt Workout">
    <template #header>
      <div class="flex h-auto items-center border-b-4 border-dotted">
        <img :alt="$title" class="w-auto" src="../assets/images/alphomega.png"/>
      </div>
    </template>

    <template #profile>
      <ProfileComponent v-if="userStore.state.jwtToken"/>
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

<style scoped></style>
