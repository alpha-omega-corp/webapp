<script setup lang="ts">
import ModalComponent from "@Components/ModalComponent.vue";
import RolesDropdownComponent from "@Components/RolesDropdownComponent.vue";
import ServicesDropdownComponent from "@Components/ServicesDropdownComponent.vue";
import ButtonComponent from "@Components/ButtonComponent.vue";
import {PlusCircleIcon} from "@heroicons/vue/20/solid";
import {ref} from "vue";
import {Role, Service} from "@assets/models/permissions";
import {apiPost} from "@/axios";

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
      button-text="Permissions"
      @click="createPermsModal = true">
    <PlusCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
  </ButtonComponent>

  <ModalComponent
      type="create"
      @submit="createPerms"
      :open="createPermsModal"
      @close-modal="createPermsModal = false"
      submitButton="Create"
      title="Create Role">

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
            <label for="read" class="font-medium text-gray-900">Read</label>
            <p id="comments-description" class="text-gray-500">
              Grant read access to resource
            </p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="read" aria-describedby="can-read" name="read" v-model="canRead" type="checkbox"
                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
          </div>
        </div>
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label for="write" class="font-medium text-gray-900">Write</label>
            <p id="candidates-description" class="text-gray-500">
              Grant write access to resource
            </p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="write" aria-describedby="can-write" name="write" v-model="canWrite" type="checkbox"
                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
          </div>
        </div>
        <div class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label for="manage" class="font-medium text-gray-900">Manage</label>
            <p id="offers-description" class="text-gray-500">
              Grant management access to resource
            </p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input id="manage" aria-describedby="can-manage" name="manage" v-model="canManage" type="checkbox"
                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
          </div>
        </div>
      </div>
    </fieldset>
  </ModalComponent>
</template>

