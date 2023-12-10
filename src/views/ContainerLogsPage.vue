<script lang="ts" setup>

import {apiGet} from "@/axios";
import {AxiosResponse} from "axios";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {GetContainerLogsResponse} from "@assets/models/containers";

const route = useRoute();
const logs = ref<string>('')

apiGet<GetContainerLogsResponse>(`/container/${route.params.id}/logs`)
    .then((res: AxiosResponse<GetContainerLogsResponse>) => {
      logs.value = res.data.logs
    }).catch((err: any) => {
      console.log(err)
    })

</script>

<template>
  <h1>LOGS</h1>
  <pre>
    {{logs}}
  </pre>
</template>
