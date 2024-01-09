<script lang="ts" setup>
import {
  PaperClipIcon,
  ArrowRightCircleIcon,
  TrashIcon,
  PlusCircleIcon
} from '@heroicons/vue/20/solid'
import {PackageVersion} from "@assets/models/containers.js";
import ButtonComponent from "@Components/ButtonComponent.vue";
import PackageVersionContainersComponent from "@Components/PackageVersionContainersComponent.vue";

defineEmits([
  'fetch:content',
  'push:version',
  'delete:version',
  'create:container',
  'create:version'
])
const props = defineProps<{
  name: string,
  versions?: PackageVersion[],
}>()
</script>

<template>

  <div class="m-4">
    <ButtonComponent
        class="btn-primary w-full"
        text="New Version"
        @click="$emit('create:version')">
      <PlusCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
    </ButtonComponent>
  </div>

  <div v-if="versions">

    <template v-for="version in versions">
      <div class="flex flex-col gap-4 package-version-card">
        <div>
          <h6 class="underline">Repository</h6>
          <a :href="version.repoLink" class="text-orange-400 font-bold hover:underline" target="_blank">
            {{ version.repoPath }}
          </a>
          <p class="text-sm">{{ version.repoSha }}</p>
        </div>
        <div v-if="version.versionId">
          <h6 class="underline">Package</h6>
          <a :href="version.versionLink" class="text-orange-400 font-bold hover:underline" target="_blank">
            {{ version.versionId }}
          </a>
          <p class="text-sm">{{ version.versionSha }}</p>
          <PackageVersionContainersComponent :name="name" :version="version"/>
        </div>

        <div class="flex gap-2">
          <ButtonComponent
              class="btn-light-cyan"
              text="Dockerfile"
              @click="$emit('fetch:content', version.repoPath, 'Dockerfile')">
            <PaperClipIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
          </ButtonComponent>

          <ButtonComponent
              class="btn-light-red"
              text="Delete"
              @click="$emit('delete:version', version)">
            <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
          </ButtonComponent>
        </div>

        <ButtonComponent
            v-if="version.versionId === 0"
            class="btn-light-green"
            text="Push"
            @click="$emit('push:version', version.repoName, version.repoSha)">
          <ArrowRightCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
        </ButtonComponent>

      </div>
    </template>
  </div>
</template>

<style scoped>

</style>