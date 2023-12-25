<script lang="ts" setup>
import {useRoute} from "vue-router";
import {apiGet, apiPost} from "@/axios";
import {AxiosResponse} from "axios";
import {GetPackageResponse, Package, GithubPackage} from "@assets/models/containers";
import {ref} from "vue";
import EditorComponent from "@Components/EditorComponent.vue";
import ButtonComponent from "@Components/ButtonComponent.vue";
import {ArrowsRightLeftIcon, ArchiveBoxIcon} from "@heroicons/vue/20/solid";
import InputComponent from "@Components/InputComponent.vue";
import ModalComponent from "@Components/ModalComponent.vue";
import RoleBadgeComponent from "@Components/RoleBadgeComponent.vue";

const route = useRoute();
const packageId = route.params.id as string;

const pkg = ref<Package>({} as Package)
const gitPkg = ref<GithubPackage>({} as GithubPackage)

const createContainerModal = ref<boolean>(false)
const bootContainerName = ref<string>('')

const dockerFileContent = ref<string>('')

apiGet<GetPackageResponse>('/package/' + packageId)
    .then((res: AxiosResponse<GetPackageResponse>) => {
      const item = res.data.package as Package
      item.dockerfile = atob(item.dockerfile)
      item.makefile = atob(item.makefile)
      pkg.value = item
      gitPkg.value = item.git

      console.log(gitPkg.value)

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

const createContainer = (ctName: string) => {
  apiPost('/package/' + packageId + '/container', {
    id: packageId,
    ctName: ctName,
  })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
}

const getDockerfile = (content: string) => {
  dockerFileContent.value = content
}

</script>

<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        {{ pkg.name }}:{{ pkg.tag }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          <a
              :href="gitPkg.htmlUrl"
              class="text-indigo-500 font-semibold underline"
              target="_blank">
            {{ gitPkg.url }}
          </a>
      </p>

      <div class="flex">
          <ButtonComponent
              v-if="pkg.synced"
              class="mt-4"
              buttonText="Push"
              @click="pushPackage">
            <ArrowsRightLeftIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </ButtonComponent>



        <ButtonComponent
            class="mt-4"
            buttonText="Container"
            @click="createContainerModal = true">
          <ArchiveBoxIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        </ButtonComponent>

        <ModalComponent
            type="create"
            @submit="createContainer(bootContainerName)"
            :open="createContainerModal"
            @close-modal="createContainerModal = false"
            submitButton="Create Container"
            title="New Container"
        >

          <InputComponent
              label="Container Name"
              placeholder="..."
              type="text"
              v-model:value="bootContainerName"/>


        </ModalComponent>
      </div>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Dockerfile
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <EditorComponent name="editor" :content="pkg.dockerfile" @update:content="getDockerfile"/>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>