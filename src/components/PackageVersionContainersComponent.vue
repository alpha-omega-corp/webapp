<script lang="ts" setup>


import {apiDelete, apiGet, apiPost} from "@/axios";
import {Container, GetContainersResponse, PackageVersion} from "@assets/models/containers";
import {AxiosResponse} from "axios";
import {ref} from "vue";
import PackageContainerComponent from "@Components/PackageContainerComponent.vue";
import ModalComponent from "@Components/ModalComponent.vue";
import {StatusResponse} from "@assets/models/request";
import {ArchiveBoxIcon} from "@heroicons/vue/20/solid";
import ButtonComponent from "@Components/ButtonComponent.vue";
import InputComponent from "@Components/InputComponent.vue";

const props = defineProps<{
  name: string,
  version: PackageVersion,
}>()

const containers = ref<Container[]>([])
const container = ref<Container>()
const createContainerModal = ref<boolean>(false)
const deleteContainerModal = ref<boolean>(false)

const getContainers = () => {
  apiGet<GetContainersResponse>(`/docker/packages/${props.name}/containers/${props.version.repoName}`)
      .then((res: AxiosResponse<GetContainersResponse>) => {
        containers.value = res.data.containers
        console.log(containers.value)
      }).catch((err: any) => {
    console.log(err)
  })
}

const createContainerName = ref<string>()
const createContainer = () => {
  if (createContainerName.value) {
    apiPost<StatusResponse>(`/docker/packages/${props.name}/container/${props.version.repoName}`, {
      containerName: createContainerName.value,
    })
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 201) {
            createContainerModal.value = false
            getContainers()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const deleteContainer = () => {
  if (container.value) {
    apiDelete<StatusResponse>(`/docker/containers/${container.value.id}`)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 200) {
            deleteContainerModal.value = false
            getContainers()
          }
        }).catch((err: any) => {
      console.log(err)
    })
  }
}

const openDeleteContainer = (c: Container) => {
  container.value = c
  deleteContainerModal.value = true
}

getContainers()
</script>


<template>
  <div>
    <ButtonComponent
        class="btn-light-purple w-full mb-4"
        text="Container"
        @click="createContainerModal = true">
      <ArchiveBoxIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
    </ButtonComponent>

    <template v-for="container in containers">
      <div class="border border-gray-300 p-4 mb-2">
        <PackageContainerComponent
            :container="container"
            @delete:container="openDeleteContainer"/>
      </div>
    </template>

    <ModalComponent
        type="create"
        :open="createContainerModal"
        @submit="createContainer"
        @close="createContainerModal = false">

      <InputComponent
          label="Name"
          hint="Container Name"
          v-model:value="createContainerName"
      />

    </ModalComponent>

    <ModalComponent
        type="danger"
        :open="deleteContainerModal"
        @submit="deleteContainer"
        @close="deleteContainerModal = false"
        v-if="container">
      <h6>Delete {{container.names}}</h6>
    </ModalComponent>

  </div>
</template>