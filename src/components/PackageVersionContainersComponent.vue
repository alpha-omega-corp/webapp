<script lang="ts" setup>


import {Container, PackageVersion} from "@models/containers";
import {GetContainerLogsResponse, GetContainersResponse, StatusResponse} from "@models/response";
import {NotificationType} from "@enums/notification";
import {AxiosResponse} from "axios";

import {ref} from "vue";
import {apiDelete, apiGet, apiPost} from "@/http";
import {useNotificationStore} from "@stores/notification";

import ButtonComponent from "@components/ButtonComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import PackageContainerComponent from "@components/PackageContainerComponent.vue";
import {ArchiveBoxIcon} from "@heroicons/vue/20/solid";
import {ModalType} from "@enums/modal";


const props = defineProps<{
  name: string,
  version: PackageVersion,
}>()

const containers = ref<Container[]>([])
const container = ref<Container>()
const createContainerModal = ref<boolean>(false)
const deleteContainerModal = ref<boolean>(false)
const containerLogsModal = ref<boolean>(false)
const containerLogs = ref<string>()
const $notification = useNotificationStore()

const getContainers = () => {
  apiGet<GetContainersResponse>(`/docker/packages/${props.name}/containers/${props.version.repoName}`)
      .then((res: AxiosResponse<GetContainersResponse>) => {
        containers.value = res.data.containers
      }).catch((err: any) => {

  })
}

const createContainerName = ref<string>()
const createContainer = () => {
  if (createContainerName.value) {
    apiPost<StatusResponse>(`/docker/packages/${props.name}/containers/${props.version.repoName}`, {
      containerName: createContainerName.value,
    })
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 201) {
            createContainerModal.value = false
            getContainers()
          }
        })
        .catch((err) => {

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

    })
  }
}

const startContainer = (id: string) => {
  apiPost<StatusResponse>(`/docker/containers/${id}/start`, {})
      .then((res: AxiosResponse<StatusResponse>) => {
        if (res.data.status === 200) {
          $notification.dispatch(NotificationType.SUCCESS, 'Container started')
              .then(() => getContainers())
        }
      })
      .catch((err) => {

      })
}

const stopContainer = (id: string) => {
  apiPost<StatusResponse>(`/docker/containers/${id}/stop`, {})
      .then((res: AxiosResponse<StatusResponse>) => {
        if (res.data.status === 200) {
          $notification.dispatch(NotificationType.SUCCESS, 'Container stopped').then(() => getContainers())
        }
      })
      .catch((err) => {

      })
}

const getContainerLogs = () => {
  if (container.value) {
    apiGet<GetContainerLogsResponse>(`/docker/containers/${container.value.id}/logs`)
        .then((res: AxiosResponse<GetContainerLogsResponse>) => {
          containerLogs.value = res.data.logs
        }).catch((err: any) => {

    })
  }
}

const openDeleteContainer = (c: Container) => {
  container.value = c
  deleteContainerModal.value = true
}

const openContainerLogs = (c: Container) => {
  container.value = c
  getContainerLogs()
  containerLogsModal.value = true
}


getContainers()
</script>


<template>
  <div>

    <div class="flex gap-2 mt-2 mb-4">
      <ButtonComponent
          class="btn-light-purple"
          text="Container"
          @click="createContainerModal = true">
        <ArchiveBoxIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
      </ButtonComponent>

      <slot name="actions"></slot>
    </div>

    <template v-for="container in containers">
      <div class="border border-gray-300 p-4 mb-2">
        <PackageContainerComponent
            :container="container"
            @delete:container="openDeleteContainer"
            @start:container="startContainer"
            @stop:container="stopContainer"
            @get:logs="openContainerLogs"/>
      </div>
    </template>

    <ModalComponent
        :modal="ModalType.CREATE"
        :show="containerLogsModal"
        @close="containerLogsModal = false"
        @submit="undefined">

      <pre>{{ containerLogs }}</pre>
    </ModalComponent>

    <ModalComponent
        :modal="ModalType.CREATE"
        :show="createContainerModal"
        @close="createContainerModal = false"
        @submit="createContainer">

      <InputComponent
          v-model:value="createContainerName"
          hint="Container Name"
          label="Name"/>
    </ModalComponent>

    <ModalComponent
        v-if="container"
        :modal="ModalType.DELETE"
        :show="deleteContainerModal"
        @close="deleteContainerModal = false"
        @submit="deleteContainer">
      <h6>Delete {{ container.names }}</h6>
    </ModalComponent>

  </div>
</template>