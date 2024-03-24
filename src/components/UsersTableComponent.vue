<script lang="ts" setup>

import {ref} from "vue";
import {apiGet, apiPost} from "@/http";
import {AxiosResponse} from "axios";
import ModalComponent from "@components/ModalComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import {Role} from "@/models/permissions";
import RoleBadgeComponent from "@components/RoleBadgeComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import {ModalType} from "@enums/modal";
import {User} from "@models/user";
import {GetUsersResponse} from "@models/response";

interface UserModal {
  id: number,
  open: boolean
}

const users = ref<User[]>([])
const modals = ref<UserModal[]>([])

const updateTable = () => {
  apiGet<GetUsersResponse>('users')
      .then((res: AxiosResponse<GetUsersResponse>) => {
        users.value = res.data.users
        modals.value = users.value.map((user: User) => {
          return {
            id: user.id,
            open: ref<boolean>(false)
          } as unknown as UserModal
        })
      })
      .catch((err) => {
        console.log(err)
      })
}

function modal(id: number): UserModal {
  const searchIndex = modals.value.findIndex((user: UserModal) => user.id === id)
  return modals.value[searchIndex]
}

const updateUser = (id: number) => {
  const searchIndex = users.value.findIndex((user: User) => user.id === id)
  const user = users.value[searchIndex]

  const data = {
    name: user.name,
    roles: user.roles.filter((role: Role) => role.hasOwnProperty('active') && !role.active).map((role: Role) => role.id)
  }

  apiPost('user/' + user.id, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
}

updateTable()
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">

    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0" scope="col">Name</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Email</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Role</th>
              <th class="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">

              <ModalComponent
                  :modal="ModalType.UPDATE"
                  :show="modal(user.id).open"
                  @close="modal(user.id).open = false"
                  @submit="updateUser(user.id)"
              >

                <InputComponent
                    v-model:value="user.name"
                    label="Name"
                    placeholder="Name"
                    type="text"/>

                <InputComponent
                    v-model:value="user.email"
                    label="Email"
                    placeholder="Email"
                    type="email"/>


                <div class="mt-5">
                  <fieldset>
                    <legend class="text-base font-semibold leading-6 text-gray-900">
                      Roles
                    </legend>
                    <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                      <div v-for="(role, idx) in user.roles" :key="idx" class="relative flex items-start py-4">
                        <div class="min-w-0 flex-1 text-sm leading-6">
                          <label :for="`role-${role.id}`" class="select-none font-medium text-gray-900">
                            <RoleBadgeComponent :role="role.name"/>
                          </label>
                        </div>
                        <div class="ml-3 flex h-6 items-center">
                          <input :id="`role-${role.id}`" v-model="user.roles[idx].active" checked
                                 class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                 name="roles[]"
                                 type="checkbox"/>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </ModalComponent>

              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{
                  user.name
                }}
              </td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{
                  user.email
                }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <template v-for="role in user.roles">

                  <RoleBadgeComponent :role="role.name"/>

                </template>
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <ButtonComponent text="Edit" @click="modal(user.id).open = true">
                </ButtonComponent>
                <a class="text-indigo-600 hover:text-indigo-900">
                  <span>Edit</span>
                  <span class="sr-only">, {{ user.name }}</span>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

