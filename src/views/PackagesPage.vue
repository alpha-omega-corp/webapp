<script lang="ts" setup>

import PackageListComponent from "@Components/PackageListComponent.vue";
import {PlusIcon} from '@heroicons/vue/24/outline'

</script>

<template>

  <router-link
      :class="['text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
      to="/packages/create">
    <button type="button" class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <PlusIcon class="h-5 w-5" aria-hidden="true" />
    </button>
  </router-link>

  <br>

  <PackageListComponent/>
</template>