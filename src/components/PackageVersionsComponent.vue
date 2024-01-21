<script lang="ts" setup>
import {ArrowRightCircleIcon, PaperClipIcon, PlusCircleIcon, TrashIcon} from '@heroicons/vue/20/solid'
import {PackageVersion} from "@/models/containers.js";
import ButtonComponent from "@components/ButtonComponent.vue";
import PackageVersionContainersComponent from "@components/PackageVersionContainersComponent.vue";

defineEmits([
  'get:file',
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
      <PlusCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
    </ButtonComponent>
  </div>

  <div v-if="versions" class="flex flex-wrap">
    <template v-for="version in versions">
      <div class="flex flex-col gap-4 package-version-card">
        <div>
          <a :href="version.repoLink" class="text-orange-400 font-bold hover:underline" target="_blank">
            {{ version.repoPath }}
          </a>
          <p class="text-sm">{{ version.repoSha }}</p>

          <div>
            <PackageVersionContainersComponent :name="name" :version="version">
              <template v-slot:actions>
                <ButtonComponent
                    class="btn-light-cyan"
                    text="Dockerfile"
                    @click="$emit('get:file', version, 'Dockerfile')">
                  <PaperClipIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
                </ButtonComponent>

                <ButtonComponent
                    v-if="version.versionId === 0"
                    class="btn-light-green"
                    text="Push"
                    @click="$emit('push:version', version.repoName, version.repoSha)">
                  <ArrowRightCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
                </ButtonComponent>

                <ButtonComponent
                    class="btn-light-red"
                    text="Delete"
                    @click="$emit('delete:version', version)">
                  <TrashIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
                </ButtonComponent>
              </template>
            </PackageVersionContainersComponent>
          </div>
        </div>
        <div v-if="version.versionId">
          <h6 class="underline">Package</h6>
          <a :href="version.versionLink" class="text-orange-400 font-bold hover:underline" target="_blank">
            {{ version.versionId }}
          </a>
          <p class="text-sm">{{ version.versionSha }}</p>
        </div>

        <div class="flex gap-2">

        </div>


      </div>
    </template>
  </div>
</template>

<style scoped>

</style>