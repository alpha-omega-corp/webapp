<script lang="ts" setup>
import ServicesDropdownComponent from "@Components/ServicesDropdownComponent.vue";
import {GetPermissionsResponse, Permission, Service} from "@assets/models/permissions";
import {ref} from "vue";
import {apiGet} from "@/axios";
import {AxiosResponse} from "axios";
import RoleBadgeComponent from "@Components/RoleBadgeComponent.vue";
import CheckmarkComponent from "@Components/CheckmarkComponent.vue";

const selectedService = ref<Service>()
const permissions = ref<Permission[]>([])

const selectService = (service: Service) => {
  selectedService.value = service

  apiGet<GetPermissionsResponse>(`/permission/${service.id}`)
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
          <table class="min-w-full divide-y divide-gray-300" v-show="permissions.length > 0">
            <thead>
            <tr>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Read</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Write</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Manage</th>

              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
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
                <a href="#" class="text-indigo-600 hover:text-indigo-900"
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