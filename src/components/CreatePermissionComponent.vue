<script lang="ts" setup>
import ModalComponent from "@components/ModalComponent.vue";
import RolesDropdownComponent from "@components/RolesDropdownComponent.vue";
import ServicesDropdownComponent from "@components/ServicesDropdownComponent.vue";
import ButtonComponent from "@components/ButtonComponent.vue";
import {PlusCircleIcon} from "@heroicons/vue/20/solid";
import {ref} from "vue";
import {Role, Service} from "@/models/permissions";
import {apiPost} from "@/http";
import {ModalType} from "@enums/modal";

const createPermsModal = ref<boolean>(false)

const canRead = ref<boolean>(true)
const canWrite = ref<boolean>(false)
const canManage = ref<boolean>(false)

const selectedService = ref<Service>()
const selectedRole = ref<Role>()

const selectService = (service: Service) => selectedService.value = service
const selectRole = (role: Role) => selectedRole.value = role

const createPerms = () => {
  const data = {
    roleId: selectedRole.value?.id,
    serviceId: selectedService.value?.id,
    canRead: canRead.value,
    canWrite: canWrite.value,
    canManage: canManage.value
  }

  apiPost('/permission', data)
      .then((res) => {
        createPermsModal.value = false
      })
      .catch((err) => {
        console.log(err)
      })
}
</script>
<template>

  <ButtonComponent
      class="btn-light-purple"
      text="Permissions"
      @click="createPermsModal = true">
    <PlusCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
  </ButtonComponent>

  <ModalComponent
      :modal="ModalType.CREATE"
      :show="createPermsModal"
      @close="createPermsModal = false"
      @submit="createPerms">

    <div class="flex gap-4">
      <div class="w-full">
        <ServicesDropdownComponent @selected="selectService"/>
      </div>
      <div class="w-full">
        <RolesDropdownComponent @selected="selectRole"/>

      </div>
    </div>

    <fieldset class="border-b border-t border-gray-200 mt-4">
      <legend class="sr-only">Permissions</legend>
      <div class="divide-y divide-gray-200">
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label class="font-medium text-gray-900" for="read">Read</label>
            <p id="comments-description" class="text-gray-500">
              Grant read access to resource
            </p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="read" v-model="canRead" aria-describedby="can-read"
                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" name="read"
                   type="checkbox"/>
          </div>
        </div>
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label class="font-medium text-gray-900" for="write">Write</label>
            <p id="candidates-description" class="text-gray-500">
              Grant write access to resource
            </p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="write" v-model="canWrite" aria-describedby="can-write"
                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" name="write"
                   type="checkbox"/>
          </div>
        </div>
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label class="font-medium text-gray-900" for="manage">Manage</label>
            <p id="offers-description" class="text-gray-500">
              Grant management access to resource
            </p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="manage" v-model="canManage" aria-describedby="can-manage"
                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" name="manage"
                   type="checkbox"/>
          </div>
        </div>
      </div>
    </fieldset>
  </ModalComponent>
</template>

