<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {apiPost} from "@/http";

const router = useRouter()

const email = ref<string>()
const password = ref<string>()

function onSubmit() {
  apiPost<void>('/register', {
    email: email.value,
    password: password.value
  }).then(() => router.push('/login'))
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt="Alphomega" class="mx-auto h-64 w-auto" src="../../assets/images/alphomega.png"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit()">

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="email">Email</label>
          <div class="mt-2">
            <input
                id="email"
                v-model="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="email"
                type="email"/>
          </div>
        </div>
        <!-- Password -->
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="password">Password</label>
          <div class="mt-2">
            <input
                id="password"
                v-model="password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="password"
                type="password"/>
          </div>
        </div>
        <!-- Submit Form -->
        <div>
          <button
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
