<script lang="ts" setup>
import {useRoute} from "vue-router";
import {apiGet, apiPost} from "@/axios";
import {AxiosResponse} from "axios";
import {GetPackageResponse, Package, GithubPackage} from "@assets/models/containers";
import {ref} from "vue";
import EditorComponent from "@Components/EditorComponent.vue";
import ButtonComponent from "@Components/ButtonComponent.vue";
import {ArrowsRightLeftIcon, ArchiveBoxIcon} from "@heroicons/vue/20/solid";

const route = useRoute();
const packageId = route.params.id as string;

const pkg = ref<Package>({} as Package)
const gitPkg = ref<GithubPackage>({} as GithubPackage)

apiGet<GetPackageResponse>('/package/' + packageId)
    .then((res: AxiosResponse<GetPackageResponse>) => {
      const item = res.data.package as Package
      item.dockerfile = atob(item.dockerfile)
      item.makefile = atob(item.makefile)
      pkg.value = item
      gitPkg.value = item.git

      console.log(item)
    }).catch((err: any) => {
  console.log(err)
})

const pushPackage = () => {
  apiPost('/package/' + packageId + '/push', {
    id: packageId
  })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
}

const createContainer = () => {
  apiPost('/package/' + packageId + '/container', {
    id: packageId
  })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
}
</script>

<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        {{ pkg.name }}:{{pkg.tag}}
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {{gitPkg.url }}
      </p>

      <div class="flex">
          <ButtonComponent
              class="mt-4"
              buttonText="Push"
              @click="pushPackage">
            <ArrowsRightLeftIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </ButtonComponent>

        <ButtonComponent
            class="mt-4"
            buttonText="Container"
            @click="createContainer">
          <ArchiveBoxIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        </ButtonComponent>
      </div>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Dockerfile
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <EditorComponent :inputValue="pkg.dockerfile"/>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Makefile</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <EditorComponent :inputValue="pkg.makefile"/>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>