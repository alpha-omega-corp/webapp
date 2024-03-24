<script lang="ts" setup>
import {ref} from "vue";
import {apiDelete, apiGet, apiPost} from "@/http";

import {AxiosResponse} from "axios";
import {Secret} from "@models/config";
import {GetSecretContentResponse, GetSecretsResponse, StatusResponse} from "@models/response";
import {VarType} from "@enums/environment";
import {ModalType} from "@enums/modal";

import SecretsTableComponent from "@components/SecretsTableComponent.vue";
import ModalComponent from "@components/ModalComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import EditorComponent from "@components/EditorComponent.vue";
import SecretsFilterComponent from "@components/SecretsFilterComponent.vue";

const secret = ref<Secret>()
const secrets = ref<Secret[]>([])
const filteredSecrets = ref<Secret[]>([])
const filterType = ref<string>(VarType.ALL)
const createSecretModal = ref<boolean>(false)
const deleteSecretModal = ref<boolean>(false)
const editSecretModal = ref<boolean>(false)
const createSecretName = ref<string>()
const createSecretContent = ref<string>()

function syncEnvironment(): void {
  apiPost<StatusResponse>('/github/secrets/sync', {})
      .then((res: AxiosResponse<StatusResponse>) => {
        console.log(res.data)
      }).catch((err: any) => {
    console.log(err)
  })
}

function getSecrets(): void {
  apiGet<GetSecretsResponse>('/github/secrets')
      .then((res: AxiosResponse<GetSecretsResponse>) => {
        secrets.value = res.data.secrets
        filter()

      }).catch((err: any) => {
    console.log(err)
  })
}

function createSecret(): void {
  apiPost<StatusResponse>('/github/secrets', {
    name: createSecretName.value,
    content: createSecretContent.value,
  })
      .then((res: AxiosResponse<StatusResponse>) => {
        if (res.data.status === 201) {
          createSecretModal.value = false
          editSecretModal.value = false
          getSecrets()
        }
      }).catch((err: any) => {
    console.log(err)
  })
}

function deleteSecret(): void {
  if (secret.value) {
    apiDelete<StatusResponse>(`/github/secrets/${secret.value.name}`)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 200) {
            deleteSecretModal.value = false
            getSecrets()
          }
        }).catch((err: any) => {
      console.log(err)
    })
  }
}

const openDeleteSecret = (value: Secret) => {
  secret.value = value
  deleteSecretModal.value = true
}

const openEditSecret = (value: Secret) => {
  secret.value = value
  apiGet<GetSecretContentResponse>(`/github/secrets/${value.name}`)
      .then((res: AxiosResponse<GetSecretContentResponse>) => {
        createSecretContent.value = atob(res.data.content)
        createSecretName.value = value.name
        editSecretModal.value = true
      }).catch((err: any) => {
    console.log(err)
  })
}

const filterSecrets = (type: string) => {
  filterType.value = type
  filter()
}

function filter() {
  if (filterType.value === VarType.ALL) {
    filteredSecrets.value = secrets.value
    return
  }

  filteredSecrets.value = secrets.value.filter((secret: Secret) => {
    return secret.name.startsWith(filterType.value.toUpperCase())
  })
}

function search(event: Event): void {
  const target = event.target as HTMLInputElement
  const query = target.value.toLowerCase()

  if (query.length === 0) {
    filteredSecrets.value = secrets.value
    filter()
    return
  }
  filteredSecrets.value = filteredSecrets.value.filter((secret) => {
    return secret.name.toLowerCase().includes(query)
  })
}


getSecrets()
</script>

<template>
  <SecretsFilterComponent @filter="filterSecrets"/>

  <SecretsTableComponent
      :secrets="filteredSecrets"
      @sync:environment="syncEnvironment"
      @create:secret="createSecretModal = true"
      @delete:secret="openDeleteSecret"
      @edit:secret="openEditSecret">

    <template v-slot:search>
      <InputComponent
          class="w-1/3"
          placeholder="Search"
          @input="search"/>
    </template>

  </SecretsTableComponent>

  <ModalComponent
      :modal="ModalType.CREATE"
      :show="createSecretModal"
      @close="createSecretModal = false"
      @submit="createSecret">

    <h6 class="mb-4">Config</h6>
    <EditorComponent
        lang="yaml"
        name="editor"
        @update:content="(c: string) => createSecretContent = c"
    />

    <InputComponent
        v-model:value="createSecretName"
        label="Secret Name"
    />
  </ModalComponent>

  <ModalComponent
      :modal="ModalType.UPDATE"
      :show="editSecretModal"
      @close="editSecretModal = false"
      @submit="createSecret">

    <h6 class="mb-4">Config</h6>
    <EditorComponent
        :content="createSecretContent"
        lang="yaml"
        name="editor"
        @update:content="(c: string) => createSecretContent = c"
    />

    <InputComponent
        v-model:value="createSecretName"
        label="Secret Name"
    />
  </ModalComponent>

  <ModalComponent
      v-if="secret"
      :modal="ModalType.DELETE"
      :show="deleteSecretModal"
      @close="deleteSecretModal = false"
      @submit="deleteSecret">

    <h6 class="mb-4">Delete {{ secret.name }}</h6>
  </ModalComponent>

</template>