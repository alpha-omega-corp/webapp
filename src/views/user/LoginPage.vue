<script lang="ts" setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import {apiPost} from "@/http";
import {useUserStore} from "@stores/user";
import {useNotificationStore} from "@stores/notification";
import {Authentication} from "@models/authentication";
import {AxiosResponse} from "axios";
import InputComponent from "@components/InputComponent.vue";


const router = useRouter()
const $user = useUserStore()
const $notification = useNotificationStore()

const email = ref<string>()
const password = ref<string>()

function login() {
  apiPost<Authentication>('/auth/login', {
    email: email.value,
    password: password.value
  }).then((res: AxiosResponse<Authentication>) => {
    $user.commit('login', res.data)
    router.push('/')
  }).catch((err: Error) => {$notification.dispatch('error', err)})
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt="Alphomega" class="mx-auto h-64 w-auto" src="../../assets/images/alphomega.png"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="email">Email address</label>
          <div class="mt-2">
            <InputComponent
                id="email"
                label="Email"
                type="email"
                v-model:value="email"/>

          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="password">Password</label>
            <div class="text-sm">
              <a class="font-semibold text-indigo-600 hover:text-indigo-500" href="#">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <InputComponent
                id="password"
                label="Name"
                type="password"
                v-model:value="password"/>
          </div>
        </div>

        <div>
          <button
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit">
            Sign in
          </button>
        </div>
      </form>

      <div class="mt-2">
        No account? <a class="font-semibold text-indigo-600 hover:text-indigo-500" href="/register">Create one here</a>
      </div>
    </div>
  </div>
</template>
