<script lang="ts" setup>

import {apiGet} from "@/axios";
import {AxiosResponse} from "axios";
import {Container, GetContainersResponse, GetPackagesResponse, Package} from "@assets/models/containers";
import {ref} from "vue";
import ContainerComponent from "@Components/ContainerComponent.vue";


const containers = ref<Container[]>([])

apiGet<GetContainersResponse>('/containers')
    .then((res: AxiosResponse<GetContainersResponse>) => {
      containers.value = res.data.containers
    }).catch((err: any) => {
  console.log(err)
})

</script>

<template>
  <div>
    <ul class="flex justify-around">
      <li v-for="container in containers">
        <ContainerComponent :container="container"/>
      </li>
    </ul>
  </div>

</template>
