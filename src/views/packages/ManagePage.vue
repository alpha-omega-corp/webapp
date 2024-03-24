<script lang="ts" setup>
import {ref} from "vue";
import {apiDelete, apiGet, apiPost} from "@/http";
import {AxiosResponse} from "axios";
import {GetPackagesResponse, StatusResponse} from "@models/response";
import {SimplePackage} from "@models/containers";
import {ModalType} from "@enums/modal";
import {PlusCircleIcon} from "@heroicons/vue/20/solid";

import PackageComponent from "@components/PackageComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import InputComponent from "@components/InputComponent.vue";

const packages = ref<SimplePackage[]>([])
const pkg = ref<SimplePackage>()
const createPackageModal = ref<boolean>(false)
const deletePackageModal = ref<boolean>(false)
const createPackageName = ref<string>()

const getPackages = () => {
  apiGet<GetPackagesResponse>('/github/packages')
      .then((res: AxiosResponse<GetPackagesResponse>) => {
        packages.value = res.data.packages
      }).catch((err: any) => {
    console.log(err)
  })
}

const createPackage = () => {
  if (createPackageName.value) {
    apiPost<StatusResponse>('/github/packages', {
      name: createPackageName.value
    })
        .then((res: AxiosResponse<StatusResponse>) => {
          console.log(res.data)
          if (res.data.status === 201) {
            createPackageModal.value = false
            getPackages()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const deletePackage = () => {
  if (pkg.value) {
    apiDelete<StatusResponse>(`/github/packages/${pkg.value.name}`)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 200) {
            deletePackageModal.value = false
            getPackages()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const openDeletePackage = (item: SimplePackage) => {
  deletePackageModal.value = true
  pkg.value = item
}

const packagePath = (item: SimplePackage) => {
  return `/packages/${item.name}/inspect`
}

getPackages()
</script>

<template>
  <div class="flex mb-4">
    <ButtonComponent
        class="btn-primary"
        text="Create Package"
        @click="createPackageModal = true">
      <PlusCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
    </ButtonComponent>
  </div>

  <div class="flex flex-wrap">
    <template v-for="item in packages" :key="item.sha">
      <router-link :to="packagePath(item)">
        <PackageComponent
            :pkg="item"
            @delete:package="openDeletePackage"
        />
      </router-link>
    </template>
  </div>

  <ModalComponent
      :modal="ModalType.CREATE"
      :show="createPackageModal"
      @close="createPackageModal = false"
      @submit="createPackage">

    <InputComponent
        v-model:value="createPackageName"
        hint="Package name in repository"
        label="Working Directory"
        type="text"/>
  </ModalComponent>

  <ModalComponent
      :modal="ModalType.DELETE"
      :show="deletePackageModal"
      @close="deletePackageModal = false"
      @submit="deletePackage">

    <h6 class="mb-4">Delete {{ pkg ? pkg.name : 'Unknown' }}</h6>
  </ModalComponent>


</template>