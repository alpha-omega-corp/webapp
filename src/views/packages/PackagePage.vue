<script lang="ts" setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {apiDelete, apiGet, apiPost, apiPostFormData} from "@/http";

import {AxiosResponse} from "axios";
import {GetPackageResponse, StatusResponse} from "@/models/response";
import {PackageVersion} from "@/models/containers";

import EditorComponent from "@components/EditorComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import PackageVersionsComponent from "@components/PackageVersionsComponent.vue";
import {ModalType} from "@enums/modal";

const route = useRoute();
const name: string = route.params.name as string;

const versions = ref<PackageVersion[]>([])
const version = ref<PackageVersion>()

const versionFileModal = ref<boolean>(false)
const createContainerModal = ref<boolean>(false)
const createVersionModal = ref<boolean>(false)
const deleteVersionModal = ref<boolean>(false)

const createVersionTag = ref<string>()
const createVersionFile = ref<string>()

const getVersions = () => {
  apiGet<GetPackageResponse>(`/github/packages/${name}`)
      .then((res: AxiosResponse<GetPackageResponse>) => {
        versions.value = res.data.versions
      }).catch((err: any) => {
    console.log(err)
  })
}

const createVersion = () => {
  if (createVersionTag.value && createVersionFile.value) {
    const blob = new Blob([createVersionFile.value], {type: 'text/plain'});
    const url = URL.createObjectURL(blob)

    const formData = new FormData();
    formData.append('tag', createVersionTag.value)
    formData.append('content', blob, url);

    apiPostFormData<StatusResponse>(`/github/packages/${name}`, formData)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 201) {
            createVersionModal.value = false
            getVersions()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const pushVersion = (tag: string, sha: string) => {
  apiPost<StatusResponse>(`/github/packages/${name}/push`, {
    tag: tag,
    sha: sha
  })
      .then((res: AxiosResponse<StatusResponse>) => {
        if (res.data.status === 201) {
          getVersions()
        }
      })
      .catch((err) => {
        console.log(err)
      })
}

const deleteVersion = () => {
  if (version.value) {
    apiDelete<StatusResponse>(`/github/packages/${name}/${version.value.repoName}/${version.value.versionId}`)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 200) {
            deleteVersionModal.value = false
            getVersions()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const getVersionFile = (v: PackageVersion, file: string) => {
  version.value = v
  apiGet<GetPackageFileResponse>(`/github/packages/${v.repoPath}/${file}`)
      .then((res: AxiosResponse<GetPackageFileResponse>) => {
        if (version.value) {
          version.value.file = atob(res.data.content)
          versionFileModal.value = true
        }
      })
      .catch((err) => {
        console.log(err)
      })
}

const openCreateContainer = (v: PackageVersion) => {
  version.value = v
  createContainerModal.value = true
}

const openDeleteVersion = (v: PackageVersion) => {
  version.value = v
  deleteVersionModal.value = true
}

getVersions()
</script>

<template>
  <PackageVersionsComponent
      :name="name"
      :versions="versions"
      @get:file="getVersionFile"
      @push:version="pushVersion"
      @create:container="openCreateContainer"
      @delete:version="openDeleteVersion"
      @create:version="createVersionModal = true"
  />

  <ModalComponent
      :modal="ModalType.DISPLAY"
      :show="versionFileModal"
      @close="versionFileModal = false">

    <h6 class="mb-4">Dockerfile</h6>
    <EditorComponent :content="version?.file" lang="dockerfile" name="editor"/>
  </ModalComponent>

  <ModalComponent
      :modal="ModalType.CREATE"
      :show="createVersionModal"
      @close="createVersionModal = false"
      @submit="createVersion">

    <h6 class="mb-4">Dockerfile</h6>
    <EditorComponent :content="''" lang="dockerfile" name="editor"
                     @update:content="(c: string) => createVersionFile = c"/>

    <InputComponent
        v-model:value="createVersionTag"
        label="Tag"/>
  </ModalComponent>

  <ModalComponent
      v-if="version"
      :modal="ModalType.DELETE"
      :show="deleteVersionModal"
      @close="deleteVersionModal = false"
      @submit="deleteVersion">

    <h6>Delete {{ version.repoPath }}</h6>
  </ModalComponent>


</template>