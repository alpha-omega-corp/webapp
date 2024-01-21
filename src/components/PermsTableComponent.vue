<script lang="ts" setup>
import ServicesDropdownComponent from "@components/ServicesDropdownComponent.vue";
import {GetPermissionsResponse, Permission, Service} from "@/models/permissions";
import {ref} from "vue";
import {apiGet} from "@/http";
import {AxiosResponse} from "axios";
import RoleBadgeComponent from "@components/RoleBadgeComponent.vue";
import CheckmarkComponent from "@components/CheckmarkComponent.vue";

const selectedService = ref<Service>()
const permissions = ref<Permission[]>([])

const selectService = (service: Service) => {
  selectedService.value = service

  apiGet<GetPermissionsResponse>(`permission/${service.id}`)
      .then((res: AxiosResponse<GetPermissionsResponse>) => {
        permissions.value = res.data.permissions
      })
      .catch((err) => {
        console.log(err)
      })
}
</script>


<template>

  <ServicesDropdownComponent @selected="selectService"/>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table v-show="permissions.length > 0" class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Role</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Read</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Write</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Manage</th>

              <th class="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="permission in permissions" :key="permission.id">

              <td class="whitespace-nowrap px-3 py-4">
                <RoleBadgeComponent :role="permission.role.name"/>
              </td>
              <td class="whitespace-nowrap px-3 py-4">
                <CheckmarkComponent :checked="permission.canRead"/>
              </td>
              <td class="whitespace-nowrap px-3 py-4">
                <CheckmarkComponent :checked="permission.canWrite"/>
              </td>
              <td class="whitespace-nowrap px-3 py-4">
                <CheckmarkComponent :checked="permission.canManage"/>
              </td>

              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <a class="text-indigo-600 hover:text-indigo-900" href="#"
                >Edit<span class="sr-only">, {{ permission.id }}</span></a
                >
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


</template>