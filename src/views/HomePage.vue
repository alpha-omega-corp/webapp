<script lang="ts" setup>

import {apiGet, apiPostFormData} from "@/http";
import {GetPackageResponse, GetPackagesResponse, StatusResponse} from "@models/response";
import {GetContainersResponse} from "@models/response";
import {AxiosResponse} from "axios";

apiGet<GetPackageResponse>(`/github/containers/ubuntu`)
    .then((res: AxiosResponse<GetPackageResponse>) => {
      console.log(res)
    }).catch((err: any) => {
  console.log(err)
})

apiGet<GetPackagesResponse>('/github/containers')
    .then((res: AxiosResponse<GetPackagesResponse>) => {
      console.log(res)
    }).catch((err: any) => {
  console.log(err)
})

apiGet<GetContainersResponse>('/docker/containers').then((res: AxiosResponse<GetContainersResponse>) => {
  console.log(res)
}).catch((err: any) => {
  console.log(err)
})

const formData = new FormData();

const blob = new Blob(["Hello World"], {type: 'text/plain'});
const url = URL.createObjectURL(blob)


formData.append('content', blob, url);
formData.append('name', "name");

const createImage = (data: FormData) => {
  apiPostFormData<StatusResponse>(`/docker/image`, data).then((res: AxiosResponse<StatusResponse>) => {
    console.log(res)
  })
}

createImage(formData)


</script>

<template>
  <h1 class="text-xl font-bold font-mono text-center">Home</h1>
</template>
