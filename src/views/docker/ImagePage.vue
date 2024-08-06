<script lang="ts" setup>
import EditorComponent from "@components/EditorComponent.vue";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import ButtonComponent from "@components/ButtonComponent.vue";
import {ActionType} from "@enums/action";
import {apiPostFormData, newFormData} from "@/http";
import {StatusResponse} from "@models/response";
import {AxiosResponse} from "axios";
import {useNotificationStore} from "@stores/notification";
import {useEditorStore} from "@stores/editor";
import {ref} from "vue";
import ModalComponent from "@components/ModalComponent.vue";
import InputComponent from "@components/InputComponent.vue";
import {File} from "@models/file";
const $notification = useNotificationStore()
const $editor = useEditorStore()

const createFileModal = ref<boolean>(false)
const deleteFileModal = ref<boolean>(false)
const createFileName = ref<string>('')
const currentFile = ref<File>()

const createFile = () => {
  $editor.dispatch('create', {
    name: `dockerfile-${createFileName.value}`,
    content: '',
    isOpen: false,
    isSelected: false
  })

  createFileModal.value = false
}

const deleteFile = () => {
  $editor.dispatch('delete', currentFile.value)
  deleteFileModal.value = false
}

const buildImage = () => {
  apiPostFormData<StatusResponse>(`/docker/image`, newFormData(''))
      .then((res: AxiosResponse<StatusResponse>) => {
        if (res.data.status === 201) {
          $notification.dispatch('success', 'Image created successfully')
        }
      })
      .catch((err) => {
        console.log(err)
      })
}

const openDeleteFile = (file: File) => {
  deleteFileModal.value = true
  currentFile.value = file
}
</script>

<template>



  <div class="grid grid-cols-4">
    <div>

      <nav class="flex flex-1 flex-col sidebar" aria-label="Files">

        <div class="flex p-3 justify-between border-b">
          <h3 class="text-lg font-semibold text-gray-900">Files</h3>
          <ButtonComponent
              :background="false"
              :action="ActionType.CREATE"
              @click="createFileModal = true">
          </ButtonComponent>
        </div>

        <ul role="list" class="sidebar-content">
          <li v-for="file in $editor.state.files" :key="file.name" class="flex justify-between gap-2">
            <div
                @click="$editor.dispatch('open', file)"
                :class="[$editor.getters.selected === file ? 'bg-gray-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex gap-x-3 rounded-md text-sm font-semibold leading-6 file w-full']">
              {{ file.name }}
            </div>

            <ButtonComponent
                :background="false"
                :action="ActionType.DELETE"
                @click="openDeleteFile(file)"
            />
          </li>
        </ul>
      </nav>
    </div>

    <div class="col-span-3">
      <div>
        <ul class="flex">
          <li v-for="file in $editor.state.items" :key="file.name" :class="file.isSelected ? 'tab-active' : 'tab-inactive'" class="tab">
            <div @click="$editor.dispatch('select', file)" class="tab-btn">
              <span  class="tab-content">{{ file.name }}</span>
            </div>
            <XMarkIcon class="-ml-0.5 h-5 w- tab-close" @click="$editor.dispatch('close', file)"/>
          </li>
        </ul>
      </div>

      <div v-for="file in $editor.state.items">
        <EditorComponent
            v-if="file.isSelected"
            :content="file.content"
            @update:content="(w: string) => $editor.dispatch('update', w)"
            lang="dockerfile"
            :name="file.name"
        >

          <ButtonComponent
              text="Build"
              :action="ActionType.CREATE"
              @click="buildImage"
          />

        </EditorComponent>
      </div>
    </div>
  </div>

  <ModalComponent
      title="New File"
      :modal="ActionType.CREATE"
      :show="createFileModal"
      @close="createFileModal = false"
      @submit="createFile">

    <InputComponent
        label="Name"
        type="text"
        v-model:value="createFileName"/>

  </ModalComponent>

  <ModalComponent
      title="Delete File"
      :modal="ActionType.DELETE"
      :show="deleteFileModal"
      @close="deleteFileModal = false"
      @submit="deleteFile">

    <p>Delete <b>{{ currentFile?.name }}</b> ? </p>
  </ModalComponent>
</template>

<style lang="scss" scoped>

.sidebar {
  height: 100%;
  border: 1px solid #ccc;


  .sidebar-content {
    padding: 10px;
  }

  .file {
    cursor: pointer;
  }
}

.tab {
  position: relative;
  cursor: pointer;
  margin: 0;
  font-size: small;
  height: 100%;

  &:hover {
    .tab-close {
      display: block;
    }
  }

  .tab-btn {
    border: 1px solid #ccc;
    padding: 20px;

    .tab-content {
      margin-right: 20px;
    }
  }
}

.tab-inactive:hover {
  background-color: #ccc;
  color: #000;
}

.tab-active {
  background-color: #000;
  color: #fff;
  border-bottom: 1px solid #4f46e5;
}

.tab-close {
  display: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

</style>