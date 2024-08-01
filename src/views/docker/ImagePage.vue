<script lang="ts" setup>
import EditorComponent from "@components/EditorComponent.vue";
import {ref} from "vue";
import GridComponent from "@components/GridComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import {ActionType} from "@enums/action";
import {newFormData} from "@/helper";
import {apiPostFormData} from "@/http";
import {StatusResponse} from "@models/response";
import {AxiosResponse} from "axios";
import {useNotificationStore} from "@stores/notification";

const $notification = useNotificationStore()

const content = ref<string>(JSON.parse(localStorage.getItem('dockerfile') ?? ''))
const fileName = ref<string>()

const storeContent = (content: string) => {
  localStorage.setItem('dockerfile', JSON.stringify(content))
}

const createImage = () => {

  apiPostFormData<StatusResponse>(`/docker/image`, newFormData(content.value))
      .then((res: AxiosResponse<StatusResponse>) => {
        if (res.data.status === 201) {
          $notification.dispatch('success', 'Image created successfully')
        }
      })
      .catch((err) => {
        console.log(err)
      })
}

</script>

<template>

  <GridComponent columns="3">

    <EditorComponent
        :content="content"
        @update:content="storeContent"
        lang="dockerfile"
        name="editor"
    />

    <ButtonComponent
        text="Build"
        :action="ActionType.CREATE"
        @click="createImage"
      />

  </GridComponent>

</template>