<script lang="ts" setup>

import {apiGet} from "@/http";
import {AxiosResponse} from "axios";
import {GetCommitsResponse, GetRepositoriesResponse, Repository} from "@models/response";
import {ref} from "vue";

const repositories = ref<Repository[]>([])

apiGet<GetRepositoriesResponse>(`/github/repositories`)
    .then((res: AxiosResponse<GetRepositoriesResponse>) => {
      repositories.value = res.data.items
    })

const getCommits = (repository: string) => {
  apiGet<GetCommitsResponse>(`/github/repository/${repository}/commits`)
      .then((res: AxiosResponse<GetCommitsResponse>) => {
        console.log(res.data.items);
      })
}

getCommits("alpha-omega-corp/wiki-template")




</script>


<template>

  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="repository in repositories" :key="repository.id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">

      <a target="_blank" class="text-blue-500" :href="repository.html_url">{{repository.full_name}}</a>

      {{}}

    </li>
  </ul>

</template>