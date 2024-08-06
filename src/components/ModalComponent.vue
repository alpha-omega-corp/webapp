<script lang="ts" setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {ActionType} from "@enums/action";
import ButtonComponent from "@components/ButtonComponent.vue";

defineEmits([
  'close',
  'submit'
])

const props = defineProps<{
  modal: ActionType
  show: boolean,
  button?: string,
  title?: string
}>()

</script>

<template>
  <TransitionRoot :show="show" as="template">
    <Dialog as="div" class="relative z-10 overflow-y-auto" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900 border-b border-black p-6">
                {{ props.title }}
              </DialogTitle>

              <div class="px-4 pb-4 pt-5 sm:p-6">
                <slot></slot>
              </div>

              <div class="gap-2 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse px-4 pb-4 pt-5 sm:p-6">
                <ButtonComponent
                    v-if="modal !== ActionType.DISPLAY"
                    :text="button === undefined ? 'Submit' : button"
                    :action="modal"
                    :submit="true"
                    @click="$emit('submit')"
                />

                <button
                    ref="cancelButtonRef"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    type="button"
                    @click="$emit('close')">
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

