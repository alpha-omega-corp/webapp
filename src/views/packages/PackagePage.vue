<script lang="ts" setup>
import {useRoute} from "vue-router";
import {apiDelete, apiGet, apiPost, apiPostFormData} from "@/axios";
import {AxiosResponse} from "axios";
import {
  GetPackageFileResponse,
  GetPackageResponse, GetPackageTagsResponse, PackageTag,
  PackageVersion
} from "@assets/models/containers";
import {ref} from "vue";
import EditorComponent from "@Components/EditorComponent.vue";
import InputComponent from "@Components/InputComponent.vue";
import ModalComponent from "@Components/ModalComponent.vue";
import {StatusResponse} from "@assets/models/request";
import PackageVersionsComponent from "@Components/PackageVersionsComponent.vue";
import PackageVersionContainersComponent from "@Components/PackageVersionContainersComponent.vue";

const route = useRoute();
const packageName = route.params.name;

const packageVersion = ref<PackageVersion>()
const versions = ref<PackageVersion[]>([])
const tags = ref<PackageTag[]>([])
const createContainerModal = ref<boolean>(false)
const createContainerName = ref<string>()
const openCreateContainer = (version: PackageVersion) => {
  packageVersion.value = version
  createContainerModal.value = true
}

const deleteVersionModal = ref<boolean>(false)
const openDeleteVersion = (version: PackageVersion) => {
  packageVersion.value = version
  deleteVersionModal.value = true
}

const getPackageTags = () => {
  apiGet<GetPackageTagsResponse>(`/docker/packages/${packageName}/tags`)
      .then((res: AxiosResponse<GetPackageTagsResponse>) => {
        tags.value = res.data.tags
        console.log(tags.value)
      }).catch((err: any) => {
    console.log(err)
  })
}

getPackageTags()


const file = ref<string>()
const fetchContent = (path: string, name: string) => {
  apiGet<GetPackageFileResponse>(`/docker/packages/${path}/${name}`)
      .then((res: AxiosResponse<GetPackageFileResponse>) => {
        file.value = atob(res.data.content)
      })
      .catch((err) => {
        console.log(err)
      })
}


const pushVersion = (tag: string, sha: string) => {
  apiPost<StatusResponse>(`/docker/packages/${packageName}/push`, {
    tag: tag,
    sha: sha
  })
      .then((res: AxiosResponse<StatusResponse>) => {
        if (res.data.status === 201) {
          getPackageVersions()
        }
      })
      .catch((err) => {
        console.log(err)
      })
}


const deleteVersion = () => {
  if (packageVersion.value) {
    apiDelete<StatusResponse>(`/docker/packages/${packageName}/${packageVersion.value.repoName}/${packageVersion.value.versionId}`)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 200) {
            deleteVersionModal.value = false
            getPackageVersions()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}


const createVersionTag = ref<string>()
const createVersionContent = ref<string>()
const createVersionModal = ref<boolean>(false)

const getPackageVersions = () => {
  apiGet<GetPackageResponse>(`/docker/packages/${packageName}`)
      .then((res: AxiosResponse<GetPackageResponse>) => {
        versions.value = res.data.versions
        console.log(versions.value)
      }).catch((err: any) => {
    console.log(err)
  })
}

const createVersion = () => {
  if (createVersionTag.value && createVersionContent.value) {
    const blob = new Blob([createVersionContent.value], {type: 'text/plain'});
    const url = URL.createObjectURL(blob)

    const formData = new FormData();
    formData.append('tag', createVersionTag.value)
    formData.append('content', blob, url);

    apiPostFormData<StatusResponse>(`/docker/packages/${packageName}`, formData)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 201) {
            createVersionModal.value = false
            getPackageVersions()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

getPackageVersions()


</script>

<template>
  <div class="flex">
    <div>
      <PackageVersionsComponent
          :name="packageName"
          :versions="versions"
          @fetch:content="fetchContent"
          @push:version="pushVersion"
          @delete:version="openDeleteVersion"
          @create:version="createVersionModal = true"
          @create:container="openCreateContainer"/>
    </div>

    <div v-if="file" class="w-full">
      <EditorComponent lang="dockerfile" name="dockerfileEditor" :content="file"/>
    </div>
  </div>

  <ModalComponent
      type="create"
      button="Push Package"
      :open="createVersionModal"
      @close="createVersionModal = false"
      @submit="createVersion">

    <h6 class="mb-4">Dockerfile</h6>
    <EditorComponent lang="dockerfile" name="editor" :content="''"
                     @update:content="(c: string) => createVersionContent = c"/>

    <InputComponent
        label="Tag"
        v-model:value="createVersionTag"/>

  </ModalComponent>

  <ModalComponent
      type="danger"
      button="Delete"
      :open="deleteVersionModal"
      @submit="deleteVersion"
      @close="deleteVersionModal = false"
      v-if="packageVersion">

    <h6>Delete {{ packageVersion.repoPath }}</h6>

  </ModalComponent>


</template>