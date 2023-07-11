<script setup lang="ts">
import {appTitle} from "@/env.d";
import {routes} from "@/router";

import NavComponent from "@/components/NavComponent.vue"

</script>

<template>
  <NavComponent :routes="routes">
    <template #header>
      <div class="flex h-auto items-center border-b-4 border-dotted">
        <img :alt="appTitle" class="w-auto" src="/img/alphomega.png"/>
      </div>
    </template>

    <template #main>
      <main>
        <div>
          <div>
            <router-view/>
          </div>
        </div>
      </main>
    </template>
  </NavComponent>
</template>

<style scoped></style>
