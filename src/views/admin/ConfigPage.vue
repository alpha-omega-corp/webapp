<script lang="ts" setup>

import {AxiosResponse} from "axios";
import {GetSecretContentResponse, GetSecretsResponse, Secret} from "@assets/models/config";
import {apiDelete, apiGet, apiPost} from "@/axios";
import {ref} from "vue";
import SecretsTableComponent from "@Components/SecretsTableComponent.vue";
import ModalComponent from "@Components/ModalComponent.vue";
import InputComponent from "@Components/InputComponent.vue";
import EditorComponent from "@Components/EditorComponent.vue";
import {StatusResponse} from "@assets/models/request";

const createSecretName = ref<string>()
const createSecretContent = ref<string>()
const createSecretModal = ref<boolean>(false)

const secret = ref<Secret>()
const secrets = ref<Secret[]>([])

const syncEnvironment = () => {
  apiPost<StatusResponse>('/github/secrets/sync', {})
      .then((res: AxiosResponse<StatusResponse>) => {
        console.log(res.data)
      }).catch((err: any) => {
    console.log(err)
  })

}

const getSecrets = () => {
  apiGet<GetSecretsResponse>('/github/secrets')
      .then((res: AxiosResponse<GetSecretsResponse>) => {
        secrets.value = res.data.secrets
      }).catch((err: any) => {
    console.log(err)
  })
}

const createSecret = () => {
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

const deleteSecret = () => {
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

const deleteSecretModal = ref<boolean>(false)
const openDeleteSecret = (s: Secret) => {
  secret.value = s
  deleteSecretModal.value = true
}

const editSecretModal = ref<boolean>(false)
const openEditSecret = (s: Secret) => {
  secret.value = s

  apiGet<GetSecretContentResponse>(`/github/secrets/${s.name}`)
      .then((res: AxiosResponse<GetSecretContentResponse>) => {
        createSecretContent.value = atob(res.data.content)
        createSecretName.value = s.name
        editSecretModal.value = true
      }).catch((err: any) => {
    console.log(err)
  })

}

getSecrets()
</script>


<template>

  <SecretsTableComponent
      :secrets="secrets"
      @sync:environment="syncEnvironment"
      @create:secret="createSecretModal = true"
      @delete:secret="openDeleteSecret"
      @edit:secret="openEditSecret"/>


  <ModalComponent
      type="create"
      :open="createSecretModal"
      @close="createSecretModal = false"
      @submit="createSecret">

    <h6 class="mb-4">Config</h6>
    <EditorComponent lang="yaml" name="editor" :content="''"
                     @update:content="(c: string) => createSecretContent = c"/>

    <InputComponent
        label="Secret Name"
        v-model:value="createSecretName"/>

  </ModalComponent>

  <ModalComponent
      type="create"
      :open="editSecretModal"
      @close="editSecretModal = false"
      @submit="createSecret">

    <h6 class="mb-4">Config</h6>
    <EditorComponent lang="yaml" name="editor" :content="createSecretContent"
                     @update:content="(c: string) => createSecretContent = c"/>

    <InputComponent
        label="Secret Name"
        v-model:value="createSecretName"/>

  </ModalComponent>

  <ModalComponent
      type="danger"
      button="Delete"
      :open="deleteSecretModal"
      @close="deleteSecretModal = false"
      @submit="deleteSecret"
      v-if="secret">

    <h6 class="mb-4">Delete {{secret.name}}</h6>

  </ModalComponent>

</template>