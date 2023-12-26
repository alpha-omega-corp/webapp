<script lang="ts" setup>
import {ref} from "vue";
import {GetPackagesResponse, SimplePackage} from "@assets/models/containers.js";
import {apiDelete, apiGet, apiPost} from "@/axios";
import {AxiosResponse} from "axios";
import {EllipsisHorizontalIcon, ArchiveBoxIcon} from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import ModalComponent from "@Components/ModalComponent.vue";

interface PackageModal {
  id: number,
  open: boolean
}

const packages = ref<SimplePackage[]>([])
const modals = ref<PackageModal[]>([])

apiGet<GetPackagesResponse>('/packages')
    .then((res: AxiosResponse<GetPackagesResponse>) => {
      packages.value = res.data.packages

      if (packages.value) {
        modals.value = packages.value.map((pkg: SimplePackage) => {
          return {
            id: pkg.id,
            open: ref<boolean>(false)
          } as unknown as PackageModal
        })
      }

    }).catch((err: any) => {
  console.log(err)
})

function deletePackage(id: number) {
  apiDelete(`/package/${id}`)
      .then((res) => {
        const searchIndex = packages.value.findIndex((pkg: any) => pkg.id === id)
        packages.value.splice(searchIndex, 1)
        modal(id).open = false
      })
      .catch((err) => {
        console.log(err)
      })
}

function modal(id: number): PackageModal {
  const searchIndex = modals.value.findIndex((pkg: any) => pkg.id === id)
  return modals.value[searchIndex]
}
</script>

<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="pkg in packages" :key="pkg.id"
        class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <ModalComponent
          type="danger"
          submitButton="Delete"
          @submit="deletePackage(pkg.id)"
          :open="modal(pkg.id).open"
          @close-modal="modal(pkg.id).open = false">

        <h6>Confirm Package Removal?</h6>
      </ModalComponent>

      <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <ArchiveBoxIcon class="h-6 w-6 text-gray-400" :class="[pkg.synced ? 'text-green-500': '']" aria-hidden="true" />
        <div class="text-sm font-medium leading-6 text-gray-900">{{ pkg.name }}:{{pkg.tag}}</div>
        <Menu as="div" class="relative ml-auto">
          <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Open options</span>
            <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem v-slot="{ active }">

                <a :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">
                  <router-link :to="'/packages/' + pkg.id + '/inspect'">
                    <div class="text-sm font-semibold leading-6 text-gray-900">
                      Inspect
                    </div>
                  </router-link>
                  <span class="sr-only">, {{ pkg.name }}</span>
                </a>

              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a @click="modal(pkg.id).open = true" href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">
                  Delete
                  <span class="sr-only">, {{ pkg.name }}</span>
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">Name</dt>
          <dd class="text-gray-700">
            {{ pkg.name }}
          </dd>
        </div>
        <div class="flex justify-between gap-x-4 py-3">
          <dt class="text-gray-500">Tag</dt>
          <dd class="flex items-start gap-x-2">
            {{ pkg.tag }}
          </dd>
        </div>
      </dl>
    </li>
  </ul>
</template>