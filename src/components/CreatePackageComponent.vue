<script lang="ts" setup>
import EditorComponent from "@components/EditorComponent.vue";
import {CheckCircleIcon} from '@heroicons/vue/24/solid'
import {ref} from "vue";
import {apiPostFormData} from "@/http";

const editorContent = ref<string>('')
const workDir = ref<string>('')
const tag = ref<string>('')


function createPackage() {
  const blob = new Blob([editorContent.value], {type: 'text/plain'});
  const url = URL.createObjectURL(blob)

  const formData = new FormData();
  formData.append('dockerfile', blob, url);
  formData.append('workdir', workDir.value.toLowerCase());
  formData.append('tag', tag.value)

  apiPostFormData('/package', formData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
}

const getEditorContent = (content: string) => {
  editorContent.value = content
}
</script>

<template>

  <h1 class="text-center font-bold uppercase mb-10">New Container</h1>

  <div class="mb-10">
    <EditorComponent content="CMD" lang="dockerfile" name="editor" @update:content="getEditorContent"/>

  </div>

  <div class="flex">

  </div>
  <br>
  <button
      class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      type="button"
      @click="createPackage()">
    <CheckCircleIcon aria-hidden="true" class="-ml-0.5 h-5 w-5"/>
    Test
  </button>

</template>

