<script lang="ts" setup>
import {ArchiveBoxIcon, EllipsisHorizontalIcon} from "@heroicons/vue/24/solid";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {SimplePackage} from "@/models/containers";

defineEmits([
  'delete:package'
])
defineProps<{
  pkg: SimplePackage
}>()


</script>

<template>
  <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
    <ArchiveBoxIcon :class="[pkg.sha ? 'text-green-500': '']" aria-hidden="true" class="h-6 w-6 text-gray-400"/>
    <div class="text-sm font-medium leading-6 text-gray-900">{{ pkg.name }}</div>
    <Menu as="div" class="relative ml-auto">
      <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
        <span class="sr-only">Open options</span>
        <EllipsisHorizontalIcon aria-hidden="true" class="h-5 w-5"/>
      </MenuButton>
      <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems
            class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <MenuItem v-slot="{ active }">

            <a :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">

              <span class="sr-only">, {{ pkg.name }}</span>
            </a>

          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']" href="#"
               @click.prevent="$emit('delete:package', pkg)">
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
        {{ pkg.sha }}
      </dd>
    </div>
  </dl>
</template>