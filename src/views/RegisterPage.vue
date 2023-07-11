<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const firstName = ref<string>()
const lastName = ref<string>()
const age = ref<number>(0)
const email = ref<string>()
const password = ref<string>()

function onSubmit() {
  fetch('http://localhost:4000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      email: email.value,
      password: password.value
    })
  })
      .then(res => res.json())
      .then(data => router.push('/login'))
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
           alt="Your Company"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit()">
        <!-- First Name -->
        <div>
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <div class="mt-2">
            <input
                id="firstName"
                name="firstName"
                type="text"
                v-model="firstName"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <!-- Last Name -->
        <div>
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <div class="mt-2">
            <input
                id="lastName"
                name="lastName"
                type="text"
                v-model="lastName"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <!-- Age -->
        <div>
          <label for="age" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <div class="mt-2">
            <input
                id="age"
                name="age"
                type="number"
                v-model="age"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <div class="mt-2">
            <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <div class="mt-2">
            <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <!-- Submit Form -->
        <div>
          <button type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
