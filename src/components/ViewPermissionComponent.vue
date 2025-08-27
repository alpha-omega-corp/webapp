<script lang="ts" setup>
import ServicesDropdownComponent from "@components/ServicesDropdownComponent.vue";
import {Permission, Service} from "@/models/permissions";
import {ref} from "vue";
import {apiGet} from "@/http";
import {AxiosResponse} from "axios";
import RoleBadgeComponent from "@components/RoleBadgeComponent.vue";
import CheckmarkComponent from "@components/CheckmarkComponent.vue";
import {GetPermissionsResponse} from "@models/response";

const selectedService = ref<Service>()
const permissions = ref<Permission[]>([])

const selectService = (service: Service) => {
  selectedService.value = service

  apiGet<GetPermissionsResponse>(`/auth/services/${service.id}/permissions`)
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
      <div class="flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-2">
          <div class="inline-block min-w-full py-4 align-middle ">
            <table v-show="permissions.length > 0" class="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Role</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Read</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Write</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Manage</th>
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
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

</template>